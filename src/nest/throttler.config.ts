import type { ThrottlerModuleOptions } from '@nestjs/throttler';

/**
 * Build the rate-limiter options. Kept as a pure function of `env` so the
 * default/override branches are testable without re-importing the module.
 * `ttl` is the window in milliseconds; `limit` is requests per window per IP.
 */
export function buildThrottlerOptions(
  env: NodeJS.ProcessEnv = process.env,
): ThrottlerModuleOptions {
  return {
    throttlers: [
      {
        ttl: Number(env.RATE_LIMIT_TTL ?? 60_000),
        limit: Number(env.RATE_LIMIT_MAX ?? 120),
      },
    ],
  };
}
