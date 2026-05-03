/** @vitest-environment node */

import { afterEach, describe, expect, it, vi } from 'vitest';

import {
  buildHtmlBody,
  buildTextBody,
  escapeHtml,
  getPostmarkConfig,
  sendContactEmail,
} from './postmark.js';

describe('postmark helpers', () => {
  afterEach(() => {
    delete process.env.POSTMARK_SERVER_TOKEN;
    delete process.env.POSTMARK_FROM_EMAIL;
    delete process.env.CONTACT_EMAIL_TO;
    vi.restoreAllMocks();
  });

  it('escapeHtml escapes HTML-special characters', () => {
    expect(escapeHtml(`<evil>&"'`)).not.toContain('<evil>');
  });

  it('buildHtmlBody escapes user fields and preserves line breaks in the message body', () => {
    const html = buildHtmlBody({
      name: '<Jane>',
      email: 'jane@example.com',
      companyName: 'Co & Sons',
      message: 'Hello\nthere',
    });
    expect(html).toContain('&lt;Jane&gt;');
    expect(html).toContain('<br />');
  });

  it('buildTextBody includes all fields verbatim (non-HTML path)', () => {
    expect(
      buildTextBody({
        name: 'Jane',
        email: 'jane@example.com',
        companyName: 'Co',
        message: 'Line1\nLine2',
      }),
    ).toContain('Line1\nLine2');
  });

  it('reads and trims the Postmark email settings from env', () => {
    process.env.POSTMARK_SERVER_TOKEN = '  postmark-server-token  ';
    process.env.POSTMARK_FROM_EMAIL = '  sender@example.com  ';
    process.env.CONTACT_EMAIL_TO = '  inbox@example.com  ';

    expect(getPostmarkConfig(process.env)).toEqual({
      isConfigured: true,
      config: {
        serverToken: 'postmark-server-token',
        fromEmail: 'sender@example.com',
        toEmail: 'inbox@example.com',
        fromName: 'DevilDog Cybersecurity Website',
      },
    });
  });

  it('reports missing Postmark settings', () => {
    expect(getPostmarkConfig(process.env)).toEqual({
      isConfigured: false,
      missing: ['POSTMARK_SERVER_TOKEN', 'POSTMARK_FROM_EMAIL', 'CONTACT_EMAIL_TO'],
    });
  });

  it('calls the Postmark email endpoint using fetch', async () => {
    process.env.POSTMARK_SERVER_TOKEN = 'tok';
    process.env.POSTMARK_FROM_EMAIL = 'from@example.com';
    process.env.CONTACT_EMAIL_TO = 'to@example.com';

    const fetchSpy = vi.fn().mockResolvedValue(new Response('', { status: 200 }));

    await sendContactEmail(
      {
        name: 'Jane',
        email: 'jane@example.com',
        companyName: 'Dog',
        message: 'We need cybersecurity help with our roadmap.',
      },
      process.env,
      fetchSpy,
    );

    expect(fetchSpy).toHaveBeenCalledOnce();
    const [url] = fetchSpy.mock.calls[0] as unknown as [RequestInfo];

    expect(String(url)).toContain('postmark');
  });

  it('throws when Postmark rejects the request', async () => {
    process.env.POSTMARK_SERVER_TOKEN = 'tok';
    process.env.POSTMARK_FROM_EMAIL = 'from@example.com';
    process.env.CONTACT_EMAIL_TO = 'to@example.com';

    const fetchSpy = vi.fn().mockResolvedValue(new Response(JSON.stringify({ Message: 'nope', ErrorCode: 300 }), { status: 422 }));

    await expect(
      sendContactEmail(
        {
          name: 'Jane',
          email: 'jane@example.com',
          companyName: 'Dog',
          message: 'We need cybersecurity help with our roadmap.',
        },
        process.env,
        fetchSpy,
      ),
    ).rejects.toThrow(/422/);
  });
});
