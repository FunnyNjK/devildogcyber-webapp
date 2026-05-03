/** @vitest-environment node */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import {
  CONTACT_DELIVERY_FAILURE_MESSAGE,
  handleContactSubmission,
} from '../../api/contact/lib/handler';

function requestUrl(input: RequestInfo | URL): string {
  if (typeof input === 'string') {
    return input;
  }

  if (input instanceof URL) {
    return input.href;
  }

  return input.url;
}

describe('handleContactSubmission (integration-ish)', () => {
  let rateHits: Map<string, number[]>;
  let fetchSpy: ReturnType<typeof vi.fn>;
  let now: number;
  let clock: () => number;
  let baseEnv: NodeJS.ProcessEnv;

  beforeEach(() => {
    rateHits = new Map();
    now = 1_731_036_801_234;
    clock = () => now;
    baseEnv = {
      CONTACT_EMAIL_TO: 'team@example.com',
      CONTACT_HONEYPOT_FIELD_NAME: 'company_website',
      CONTACT_RATE_LIMIT_MAX: '5',
      CONTACT_RATE_LIMIT_WINDOW_MS: '600000',
      POSTMARK_FROM_EMAIL: 'robot@example.com',
      POSTMARK_SERVER_TOKEN: 'postmark-fixture',
      TURNSTILE_SECRET_KEY: 'turnstile-fixture-secret',
    };
    fetchSpy = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  function stubFetchBranches(
    overrides: Partial<{
      postmarkStatus: number;
      postmarkText: string;
      turnstile: { ok: boolean; codes?: string[] };
    }>,
  ) {
    const turnstilePayload = overrides.turnstile ?? { ok: true };
    const postmarkStatus = overrides.postmarkStatus ?? 200;

    fetchSpy.mockImplementation(async (requestInfo: RequestInfo) => {
      const url = requestUrl(requestInfo);

      if (url.includes('siteverify')) {
        return Response.json({
          success: turnstilePayload.ok,
          'error-codes': turnstilePayload.codes ?? [],
        });
      }

      if (url.includes('postmark')) {
        return new Response(overrides.postmarkText ?? '{}', { status: postmarkStatus });
      }

      return Response.json({});
    });
  }

  const validInnerBody = (): Record<string, unknown> => ({
    companyName: 'DevilDog Client',
    email: 'jane@example.com',
    message: 'We need help planning a compliance and monitoring roadmap.',
    name: 'Jane Doe',
    turnstileToken: 'verification-token',
  });

  it('routes a valid submission to Postmark and returns ok', async () => {
    stubFetchBranches({});

    const body = {
      ...validInnerBody(),
      company_website: '',
    };

    const res = await handleContactSubmission(
      {
        headers: new Headers({ 'x-forwarded-for': '198.51.100.42' }),
        json: async () => body,
      },
      {
        clock,
        env: baseEnv,
        fetchFn: fetchSpy as typeof fetch,
        rateHits,
      },
    );

    expect(res.status).toBe(200);

    expect(res.jsonBody as { ok: boolean }).toEqual(expect.objectContaining({ ok: true }));

    const outbound = fetchSpy.mock.calls.map(([first]) => requestUrl(first as RequestInfo));

    expect(outbound.some((endpoint: string) => endpoint.includes('siteverify'))).toBe(true);
    expect(outbound.some((endpoint: string) => endpoint.includes('postmark'))).toBe(true);
  });

  it('accepts silently when the honeypot field is populated and does not mail', async () => {
    stubFetchBranches({});

    const body = {
      ...validInnerBody(),
      company_website: 'https://evil.example',
    };

    const res = await handleContactSubmission(
      {
        headers: new Headers({ 'x-forwarded-for': '198.51.100.52' }),
        json: async () => body,
      },
      {
        clock,
        env: baseEnv,
        fetchFn: fetchSpy as typeof fetch,
        rateHits,
      },
    );

    expect(res.status).toBe(200);
    expect(res.jsonBody as { ok: boolean }).toEqual({ ok: true });

    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('returns HTTP 429 when the sliding-window limit fills', async () => {
    stubFetchBranches({});
    const env = { ...baseEnv, CONTACT_RATE_LIMIT_MAX: '2' };

    const baseRequest = (): Record<string, unknown> => ({
      ...validInnerBody(),
      company_website: '',
    });

    const first = await handleContactSubmission(
      {
        headers: new Headers({ 'x-forwarded-for': '198.51.100.71' }),
        json: async () => ({ ...baseRequest(), turnstileToken: 't1', email: 'a1@example.com' }),
      },
      { clock, env, fetchFn: fetchSpy as typeof fetch, rateHits },
    );

    const second = await handleContactSubmission(
      {
        headers: new Headers({ 'x-forwarded-for': '198.51.100.71' }),
        json: async () => ({ ...baseRequest(), turnstileToken: 't2', email: 'a2@example.com' }),
      },
      { clock, env, fetchFn: fetchSpy as typeof fetch, rateHits },
    );

    expect(first.status).toBe(200);
    expect(second.status).toBe(200);

    const third = await handleContactSubmission(
      {
        headers: new Headers({ 'x-forwarded-for': '198.51.100.71' }),
        json: async () => ({ ...baseRequest(), turnstileToken: 't3', email: 'a3@example.com' }),
      },
      { clock, env, fetchFn: fetchSpy as typeof fetch, rateHits },
    );

    expect(third.status).toBe(429);
    expect(third.jsonBody).toMatchObject({
      ok: false,
      message: expect.stringMatching(/many messages/i),
    });
  });

  it('responds with ok:false when verification fails without leaking Postmark payloads', async () => {
    stubFetchBranches({
      turnstile: {
        codes: ['invalid-input-response'],
        ok: false,
      },
    });

    const res = await handleContactSubmission(
      {
        headers: new Headers({ 'x-forwarded-for': '203.0.113.91' }),
        json: async () => ({
          ...validInnerBody(),
          company_website: '',
        }),
      },
      { clock, env: baseEnv, fetchFn: fetchSpy as typeof fetch, rateHits },
    );

    expect(res.status).toBe(400);
    expect(res.jsonBody as { ok: boolean }).toEqual(expect.objectContaining({ ok: false }));
    expect(
      fetchSpy.mock.calls.some((call) => {
        const first = call[0] as RequestInfo | undefined;
        if (!first) {
          return false;
        }
        return requestUrl(first).includes('postmark');
      }),
    ).toBe(false);
  });

  it('responds with neutral server error while Postmark is failing', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    stubFetchBranches({
      postmarkStatus: 500,
      postmarkText: 'boom',
    });

    const res = await handleContactSubmission(
      {
        headers: new Headers({ 'x-forwarded-for': '203.0.113.10' }),
        json: async () => ({
          ...validInnerBody(),
          company_website: '',
        }),
      },
      { clock, env: baseEnv, fetchFn: fetchSpy as typeof fetch, rateHits },
    );

    expect(res.status).toBe(500);
    expect(res.jsonBody as { message?: string }).toMatchObject({
      message: CONTACT_DELIVERY_FAILURE_MESSAGE,
      ok: false,
    });

    consoleSpy.mockRestore();
  });

  it('returns a generic rejection when payloads fail validation without field-level detail', async () => {
    stubFetchBranches({});

    const res = await handleContactSubmission(
      {
        headers: new Headers({ 'x-forwarded-for': '198.51.100.81' }),
        json: async () => ({
          companyName: 'X',
          company_website: '',
          email: 'bad-email',
          message: 'short',
          name: 'AB',
          turnstileToken: 'tok',
        }),
      },
      { clock, env: baseEnv, fetchFn: fetchSpy as typeof fetch, rateHits },
    );

    expect(res.status).toBe(400);
    expect(JSON.stringify(res.jsonBody)).not.toContain('Please enter');

    expect(res.jsonBody as { ok: boolean }).toEqual(
      expect.objectContaining({
        message: 'The message could not be sent. Please check your inputs and try again.',
        ok: false,
      }),
    );
  });

  it('responds with a generic rejection when JSON is unreadable', async () => {
    const res = await handleContactSubmission(
      {
        headers: new Headers(),
        json: async () => JSON.parse('{'),
      },
      { clock, env: baseEnv, fetchFn: fetchSpy as typeof fetch, rateHits },
    );

    expect(res.status).toBe(400);

    expect(res.jsonBody).toMatchObject({
      ok: false,
    });
  });
});
