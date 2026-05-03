export type SlidingRateLimiterState = Map<string, number[]>;

export function createSlidingWindowRateLimiter(deps: {
  max: number;
  windowMs: number;
  now: () => number;
  hits: SlidingRateLimiterState;
}) {
  const { max, windowMs, now, hits } = deps;

  return {
    isLimited(ipKey: string): boolean {
      const t = now();
      let arr = hits.get(ipKey) ?? [];
      arr = arr.filter((stamp) => t - stamp < windowMs);

      if (arr.length >= max) {
        hits.set(ipKey, arr);
        return true;
      }

      arr.push(t);
      hits.set(ipKey, arr);
      return false;
    },
  };
}

export function getRateLimiterFromEnv(env: NodeJS.ProcessEnv, store: SlidingRateLimiterState, nowMs: () => number) {
  const maxRaw = env.CONTACT_RATE_LIMIT_MAX ?? '5';
  const windowRaw = env.CONTACT_RATE_LIMIT_WINDOW_MS ?? '600000';
  const max = Number.parseInt(maxRaw, 10);
  const windowMs = Number.parseInt(windowRaw, 10);

  const safeMax = Number.isFinite(max) && max > 0 ? max : 5;
  const safeWindow = Number.isFinite(windowMs) && windowMs > 0 ? windowMs : 600_000;

  return createSlidingWindowRateLimiter({
    max: safeMax,
    windowMs: safeWindow,
    now: nowMs,
    hits: store,
  });
}
