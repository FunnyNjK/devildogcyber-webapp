import type { HttpRequest, HttpResponseInit } from '@azure/functions';
import { app } from '@azure/functions';

import { handleContactSubmission } from './lib/handler.js';

/** One sliding-window bucket store per warmed Function instance; acceptable per ADR-007. */
const rateLimiterHits = new Map<string, number[]>();

app.http('contact', {
  authLevel: 'anonymous',
  handler: async (request: HttpRequest): Promise<HttpResponseInit> => {
    const result = await handleContactSubmission(request, {
      env: process.env,
      fetchFn: globalThis.fetch,
      rateHits: rateLimiterHits,
      clock: () => Date.now(),
    });

    return {
      status: result.status,
      jsonBody: result.jsonBody as Record<string, unknown>,
      headers: { 'Content-Type': 'application/json' },
    };
  },
  methods: ['POST'],
  route: 'contact',
});
