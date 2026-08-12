# @kippli/common

Shared building blocks for the Kippli apps (`one`, `mykippli`, `halo`) — the code that would otherwise be copy-pasted per app and drift silently:

- **`@kippli/common/contracts`** — pure TypeScript types for everything that crosses an app boundary (`PublicSupportTier`, `ShipyardStats`, member types, the email verify/welcome request bodies, `ApiResult<T>`). No runtime dependency — safe to import from a browser bundle or a Nest service.
- **`@kippli/common/nest`** — the NestJS primitives (guard, exception filter, request-id interceptor, env-schema base, throttler config) reused across every API.
- **`@kippli/common/http`** — `InternalHttpClient`, a tiny typed client for internal service-to-service calls.

## Install

Consume it straight from GitHub (no registry needed):

```bash
npm install github:<owner>/kippli-common
# or pin a tag/commit:
npm install github:<owner>/kippli-common#v0.1.0
```

`prepare` builds the package on install, so `dist/` is produced automatically.

The NestJS peers (`@nestjs/common`, `@nestjs/throttler`, `class-validator`, `class-transformer`, `rxjs`) are **optional peer dependencies** — apps that only import `@kippli/common/contracts` don't need them.

## Usage

### Contracts (one source of truth)

```ts
import type { PublicSupportTier, ShipyardStats } from '@kippli/common/contracts';
```

Import the same type in the producer (the API that returns it) and the consumer (the frontend/storefront) so they can never drift.

### NestJS primitives

```ts
// env validation
import { BaseEnvironmentVariables, validateEnv } from '@kippli/common/nest';
export class EnvironmentVariables extends BaseEnvironmentVariables {
  @IsOptional() @IsString() MY_APP_VAR?: string;
}
ConfigModule.forRoot({ validate: (c) => validateEnv(EnvironmentVariables, c) });

// filter + interceptor + throttler
import {
  AllExceptionsFilter,
  RequestIdInterceptor,
  buildThrottlerOptions,
} from '@kippli/common/nest';
ThrottlerModule.forRoot(buildThrottlerOptions());
// providers: { provide: APP_FILTER, useClass: AllExceptionsFilter }, { provide: APP_INTERCEPTOR, useClass: RequestIdInterceptor }

// internal-secret guard — provide the secret resolver from your app config
import { InternalSecretGuard, INTERNAL_SECRET_RESOLVER } from '@kippli/common/nest';
@Module({
  providers: [
    InternalSecretGuard,
    {
      provide: INTERNAL_SECRET_RESOLVER,
      useFactory: (config: AppConfigService) => () => config.internalServiceSecret,
      inject: [AppConfigService],
    },
  ],
})
export class SomeInternalModule {}
```

### Internal HTTP client (service-to-service)

```ts
import { InternalHttpClient } from '@kippli/common/http';
import type { MemberList, SetEmailVerifiedRequest } from '@kippli/common/contracts';

const mykippli = new InternalHttpClient({
  baseUrl: config.mykippliApiUrl,
  secret: config.internalServiceSecret,
});

const members = await mykippli.get<MemberList>('/internal/members?page=1');
await mykippli.post('/internal/users/email-verified', { sub } satisfies SetEmailVerifiedRequest);
```

Base-URL normalization, the `x-internal-secret` header, and uniform error mapping (`InternalHttpError` with the HTTP status) are handled once, here.

## Develop

```bash
npm install
npm run build      # tsc → dist/
npm run typecheck  # tsc --noEmit
```

## Versioning

Bump `version` in `package.json` and tag the commit (`git tag v0.1.1`) so consumers can pin `#v0.1.1`.
