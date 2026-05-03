import { validateContactFormInput } from '../../../src/lib/contactValidation.js';

import { getRateLimiterFromEnv } from './rateLimit.js';
import type { SlidingRateLimiterState } from './rateLimit.js';

import { getPostmarkConfig, sendContactEmail } from './postmark.js';

import { verifyTurnstileToken } from './turnstile.js';

export type RequestLike = {
  headers: Headers;
  json: () => Promise<unknown>;
};

export const CONTACT_DELIVERY_FAILURE_MESSAGE =
  'Something went wrong while sending your message. Please try again later. If the issue persists, our team will review it.';

const GENERIC_VALIDATE_MESSAGE =
  'The message could not be sent. Please check your inputs and try again.';

const CONTACT_SUCCESS_MESSAGE = 'Your message has been sent. DevilDog will follow up as soon as possible.';

function extractClientIp(headers: Headers): string | null {
  const cloudflareIp = headers.get('cf-connecting-ip');
  if (cloudflareIp?.trim()) {
    return cloudflareIp.trim();
  }

  const forwardedFor = headers.get('x-forwarded-for');
  if (!forwardedFor) {
    return null;
  }

  return forwardedFor.split(',')[0]?.trim() ?? null;
}

export function getHoneypotFieldName(env: NodeJS.ProcessEnv) {
  return env.CONTACT_HONEYPOT_FIELD_NAME?.trim() || 'company_website';
}

export function honeypotFilled(payload: Record<string, unknown>, fieldName: string) {
  const raw = payload[fieldName];
  const asString =
    typeof raw === 'string' ? raw.trim() : raw != null && raw !== '' ? String(raw).trim() : '';

  return asString.length > 0;
}

export async function handleContactSubmission(
  request: RequestLike,
  deps: {
    env: NodeJS.ProcessEnv;
    fetchFn: typeof fetch;
    rateHits: SlidingRateLimiterState;
    clock: () => number;
  },
): Promise<{ status: number; jsonBody: unknown }> {
  const { env } = deps;
  const honeypotFieldName = getHoneypotFieldName(env);

  let payload: Record<string, unknown>;

  try {
    payload = (await request.json()) as Record<string, unknown>;
  } catch {
    return {
      status: 400,
      jsonBody: {
        ok: false,
        message: GENERIC_VALIDATE_MESSAGE,
      },
    };
  }

  if (!(payload instanceof Object) || Array.isArray(payload)) {
    return {
      status: 400,
      jsonBody: { ok: false, message: GENERIC_VALIDATE_MESSAGE },
    };
  }

  if (honeypotFilled(payload, honeypotFieldName)) {
    return { status: 200, jsonBody: { ok: true } };
  }

  const validation = validateContactFormInput(payload, { requireTurnstileToken: true });

  if (!validation.isValid) {
    return {
      status: 400,
      jsonBody: { ok: false, message: GENERIC_VALIDATE_MESSAGE },
    };
  }

  const ipKey = extractClientIp(request.headers) ?? 'unknown';
  const limiter = getRateLimiterFromEnv(env, deps.rateHits, deps.clock);

  if (limiter.isLimited(ipKey)) {
    return {
      status: 429,
      jsonBody: {
        ok: false,
        message: 'Too many messages were sent recently. Please wait several minutes before trying again.',
      },
    };
  }

  const turnstileResult = await verifyTurnstileToken(env, deps.fetchFn, validation.data.turnstileToken, ipKey);

  if (!turnstileResult.isConfigured) {
    console.warn('Contact form is missing Turnstile configuration.', turnstileResult.errorCodes);

    return {
      status: 500,
      jsonBody: {
        ok: false,
        message: CONTACT_DELIVERY_FAILURE_MESSAGE,
      },
    };
  }

  if (!turnstileResult.success) {
    const verificationMessage = turnstileResult.errorCodes.includes('timeout-or-duplicate')
      ? 'Verification expired. Please complete the challenge again.'
      : 'Verification failed. Please complete the challenge and try again.';

    return {
      status: 400,
      jsonBody: {
        ok: false,
        message: verificationMessage,
      },
    };
  }

  const postmarkConfigResult = getPostmarkConfig(env);

  if (!postmarkConfigResult.isConfigured) {
    console.warn('Contact form is missing Postmark configuration.', postmarkConfigResult.missing);

    return {
      status: 500,
      jsonBody: { ok: false, message: CONTACT_DELIVERY_FAILURE_MESSAGE },
    };
  }

  try {
    await sendContactEmail(
      {
        name: validation.data.name,
        email: validation.data.email,
        companyName: validation.data.companyName,
        message: validation.data.message,
      },
      env,
      deps.fetchFn,
    );
  } catch (error) {
    console.error('Failed to send contact form email.', error);

    return {
      status: 500,
      jsonBody: {
        ok: false,
        message: CONTACT_DELIVERY_FAILURE_MESSAGE,
      },
    };
  }

  return {
    status: 200,
    jsonBody: {
      ok: true,
      message: CONTACT_SUCCESS_MESSAGE,
    },
  };
}
