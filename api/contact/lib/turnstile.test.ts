/** @vitest-environment node */

import { afterEach, describe, expect, it, vi } from 'vitest';

import { getTurnstileConfig, verifyTurnstileToken } from './turnstile.js';

describe('turnstile server', () => {
  afterEach(() => {
    delete process.env.TURNSTILE_SECRET_KEY;
    vi.spyOn(console, 'error').mockRestore();
    vi.restoreAllMocks();
  });

  it('reports when server secret key is missing', () => {
    expect(getTurnstileConfig(process.env)).toEqual({
      isConfigured: false,
      missing: ['TURNSTILE_SECRET_KEY'],
    });
  });

  it('reads and trims server secret key from env', () => {
    process.env.TURNSTILE_SECRET_KEY = '  secret-key  ';

    expect(getTurnstileConfig(process.env)).toEqual({
      isConfigured: true,
      config: {
        secretKey: 'secret-key',
      },
    });
  });

  it('calls siteverify when configured', async () => {
    process.env.TURNSTILE_SECRET_KEY = 'sek';

    const fetchSpy = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ success: true }), {
        headers: { 'Content-Type': 'application/json' },
        status: 200,
      }),
    );

    const result = await verifyTurnstileToken(process.env, fetchSpy as typeof fetch, 'token', '1.2.3.4');

    expect(result.success).toBe(true);
    expect(fetchSpy).toHaveBeenCalledOnce();
    const [, init] = fetchSpy.mock.calls[0];
    expect((init?.body as string).includes('sek')).toBe(true);
    expect((init?.body as string).includes('1.2.3.4')).toBe(true);
  });

  it('returns structured failure when siteverify rejects the token', async () => {
    process.env.TURNSTILE_SECRET_KEY = 'sek';

    const fetchSpy = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ success: false, 'error-codes': ['invalid-input-response'] }), {
        status: 200,
      }),
    );

    const result = await verifyTurnstileToken(process.env, fetchSpy as typeof fetch, 'bad', undefined);

    expect(result.success).toBe(false);
    expect(result.errorCodes).toContain('invalid-input-response');
  });

  it('returns generic internal error when fetch throws', async () => {
    process.env.TURNSTILE_SECRET_KEY = 'sek';
    vi.spyOn(console, 'error').mockImplementation(() => {});

    const fetchSpy = vi.fn().mockRejectedValue(new Error('network'));

    const result = await verifyTurnstileToken(process.env, fetchSpy as typeof fetch, 'tok', null);

    expect(result.success).toBe(false);
    expect(result.errorCodes).toContain('internal-error');
  });
});
