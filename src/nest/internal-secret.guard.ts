import {
  type CanActivate,
  type ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { createHash, timingSafeEqual } from 'node:crypto';
import type { HttpRequestLike } from './http-types';

/**
 * Constant-time secret comparison. Both sides are hashed first so
 * `timingSafeEqual` always gets two equal-length buffers and neither the
 * secret's length nor its bytes leak through response timing.
 */
function secretMatches(presented: string, expected: string): boolean {
  return timingSafeEqual(
    createHash('sha256').update(presented).digest(),
    createHash('sha256').update(expected).digest(),
  );
}

/**
 * DI token for the internal-service secret resolver. Provide it in each app so
 * the guard stays decoupled from how the secret is sourced (env, config
 * service, secrets manager…). Resolving via a function (not a static value)
 * keeps reads live — a rotated secret takes effect without a restart.
 *
 * @example
 * ```ts
 * {
 *   provide: INTERNAL_SECRET_RESOLVER,
 *   useFactory: (config: AppConfigService) => () => config.internalServiceSecret,
 *   inject: [AppConfigService],
 * }
 * ```
 */
export const INTERNAL_SECRET_RESOLVER = Symbol('INTERNAL_SECRET_RESOLVER');

/** Returns the currently-configured internal secret, or undefined when unset. */
export type InternalSecretResolver = () => string | undefined;

/**
 * Guards server-to-server ("internal") routes with a pre-shared secret sent as
 * the `x-internal-secret` header. Fails closed: if the secret is unset, every
 * internal call is rejected rather than silently allowed. Apply alongside your
 * app's `@Public()` so the JWT/permission guards step aside for it.
 */
@Injectable()
export class InternalSecretGuard implements CanActivate {
  constructor(
    @Inject(INTERNAL_SECRET_RESOLVER)
    private readonly resolve: InternalSecretResolver,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const secret = this.resolve();
    if (!secret) {
      throw new UnauthorizedException(
        'Internal service secret is not configured',
      );
    }
    const request = context.switchToHttp().getRequest<HttpRequestLike>();
    const header = request.headers['x-internal-secret'];
    const presented = Array.isArray(header) ? header[0] : header;
    if (!presented || !secretMatches(presented, secret)) {
      throw new UnauthorizedException('Invalid internal service secret');
    }
    return true;
  }
}
