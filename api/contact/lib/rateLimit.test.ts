/** @vitest-environment node */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import {
  createSlidingWindowRateLimiter,
  type SlidingRateLimiterState,
} from './rateLimit.js';

describe('createSlidingWindowRateLimiter', () => {
  let hits: SlidingRateLimiterState;
  let now: number;

  beforeEach(() => {
    hits = new Map();
    now = 1_000_000;
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('allows requests below the ceiling within the window', () => {
    const limiter = createSlidingWindowRateLimiter({
      hits,
      max: 3,
      windowMs: 10_000,
      now: () => now,
    });

    expect(limiter.isLimited('a')).toBe(false);
    now += 1_000;
    expect(limiter.isLimited('a')).toBe(false);
    now += 1_000;
    expect(limiter.isLimited('a')).toBe(false);
  });

  it('blocks once the sliding window fills', () => {
    const limiter = createSlidingWindowRateLimiter({
      hits,
      max: 2,
      windowMs: 10_000,
      now: () => now,
    });

    expect(limiter.isLimited('a')).toBe(false);
    expect(limiter.isLimited('a')).toBe(false);
    expect(limiter.isLimited('a')).toBe(true);
  });

  it('tracks keys independently', () => {
    const limiter = createSlidingWindowRateLimiter({
      hits,
      max: 1,
      windowMs: 10_000,
      now: () => now,
    });

    expect(limiter.isLimited('a')).toBe(false);
    expect(limiter.isLimited('a')).toBe(true);

    expect(limiter.isLimited('b')).toBe(false);
  });

  it('expires stamps after the window elapses', () => {
    const limiter = createSlidingWindowRateLimiter({
      hits,
      max: 2,
      windowMs: 5_000,
      now: () => now,
    });

    expect(limiter.isLimited('a')).toBe(false);
    expect(limiter.isLimited('a')).toBe(false);
    expect(limiter.isLimited('a')).toBe(true);

    now += 6_000;

    expect(limiter.isLimited('a')).toBe(false);
  });
});
