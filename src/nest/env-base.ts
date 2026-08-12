import { plainToInstance } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
  validateSync,
} from 'class-validator';

export enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

export enum LogLevel {
  Fatal = 'fatal',
  Error = 'error',
  Warn = 'warn',
  Info = 'info',
  Debug = 'debug',
  Trace = 'trace',
  Silent = 'silent',
}

/**
 * Environment variables common to every Kippli Nest app. Extend this class in an
 * app to add its own vars, then pass the subclass to {@link validateEnv}. Every
 * field is optional (apps ship working defaults), but anything that IS set must
 * be well-formed — a typo'd port fails the boot instead of misbehaving later.
 */
export class BaseEnvironmentVariables {
  @IsOptional()
  @IsEnum(Environment)
  NODE_ENV?: Environment;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(65535)
  PORT?: number;

  @IsOptional()
  @IsString()
  CORS_ORIGIN?: string;

  @IsOptional()
  @IsString()
  KEYCLOAK_URL?: string;

  @IsOptional()
  @IsString()
  KEYCLOAK_REALM?: string;

  @IsOptional()
  @IsString()
  DATABASE_URL?: string;

  @IsOptional()
  @IsString()
  INTERNAL_SERVICE_SECRET?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  RATE_LIMIT_TTL?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  RATE_LIMIT_MAX?: number;

  @IsOptional()
  @IsEnum(LogLevel)
  LOG_LEVEL?: LogLevel;
}

/**
 * Validate raw env against a schema class and return the typed instance. Throws
 * with a clear message listing every invalid var, so a bad value aborts startup
 * instead of surfacing as a runtime 500. Pass to `ConfigModule.forRoot({ validate })`.
 */
export function validateEnv<T extends object>(
  cls: new () => T,
  config: Record<string, unknown>,
): T {
  const validated = plainToInstance(cls, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validated as object, {
    skipMissingProperties: false,
  });
  if (errors.length > 0) {
    throw new Error(
      `Invalid environment variables:\n${errors
        .map((error) => error.toString())
        .join('\n')}`,
    );
  }
  return validated;
}
