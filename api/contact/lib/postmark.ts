import type { ContactFormInput } from '../../../src/lib/contactValidation.js';

const postmarkApiUrl = 'https://api.postmarkapp.com/email';
const defaultFromName = 'DevilDog Cybersecurity Website';

type ContactEmailInput = Omit<ContactFormInput, 'turnstileToken'>;

type PostmarkConfig = {
  serverToken: string;
  fromEmail: string;
  toEmail: string;
  fromName: string;
};

type PostmarkErrorResponse = {
  ErrorCode?: number;
  Message?: string;
};

export function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function formatMailbox(email: string, name: string) {
  return name ? `${name} <${email}>` : email;
}

export function getPostmarkConfig(env: NodeJS.ProcessEnv) {
  const serverToken = env.POSTMARK_SERVER_TOKEN?.trim() ?? '';
  const fromEmail = env.POSTMARK_FROM_EMAIL?.trim() ?? '';
  const toEmail = env.CONTACT_EMAIL_TO?.trim() ?? '';

  const missing = [
    !serverToken ? 'POSTMARK_SERVER_TOKEN' : null,
    !fromEmail ? 'POSTMARK_FROM_EMAIL' : null,
    !toEmail ? 'CONTACT_EMAIL_TO' : null,
  ].filter(Boolean) as string[];

  if (missing.length > 0) {
    return {
      isConfigured: false as const,
      missing,
    };
  }

  return {
    isConfigured: true as const,
    config: {
      serverToken,
      fromEmail,
      toEmail,
      fromName: defaultFromName,
    } satisfies PostmarkConfig,
  };
}

export function buildTextBody(data: ContactEmailInput) {
  return [
    'New DevilDog website inquiry',
    '',
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Company: ${data.companyName}`,
    '',
    'Message:',
    data.message,
  ].join('\n');
}

export function buildHtmlBody(data: ContactEmailInput) {
  const formattedMessage = escapeHtml(data.message).replaceAll('\r\n', '\n').replaceAll('\n', '<br />');

  return `
    <h1>New DevilDog website inquiry</h1>
    <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
    <p><strong>Company:</strong> ${escapeHtml(data.companyName)}</p>
    <p><strong>Message:</strong></p>
    <p>${formattedMessage}</p>
  `.trim();
}

export async function sendContactEmail(data: ContactEmailInput, env: NodeJS.ProcessEnv, fetchFn: typeof fetch) {
  const configResult = getPostmarkConfig(env);

  if (!configResult.isConfigured) {
    throw new Error(`Missing Postmark configuration: ${configResult.missing.join(', ')}`);
  }

  const { serverToken, fromEmail, fromName, toEmail } = configResult.config;

  const response = await fetchFn(postmarkApiUrl, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-Postmark-Server-Token': serverToken,
    },
    body: JSON.stringify({
      From: formatMailbox(fromEmail, fromName),
      HtmlBody: buildHtmlBody(data),
      ReplyTo: data.email,
      Subject: `DevilDog website inquiry from ${data.name}`,
      TextBody: buildTextBody(data),
      To: toEmail,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();

    let detail = errorText;

    if (errorText) {
      try {
        const parsed = JSON.parse(errorText) as PostmarkErrorResponse;
        if (parsed.Message) {
          const errorCodeSuffix =
            typeof parsed.ErrorCode === 'number' ? ` (Postmark error ${parsed.ErrorCode})` : '';

          detail = `${parsed.Message}${errorCodeSuffix}`;
        }
      } catch {
        //
      }
    }

    throw new Error(`Postmark request failed with status ${response.status}: ${detail}`);
  }
}
