import {
  type ArgumentsHost,
  Catch,
  type ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import type { HttpReplyLike, HttpRequestLike } from './http-types';

export interface ErrorResponseBody {
  statusCode: number;
  timestamp: string;
  path: string;
  message: string | object;
}

/**
 * Catches every unhandled exception and returns one consistent JSON shape.
 * HttpExceptions keep their (already client-safe) status and message; anything
 * else becomes a generic 500 so stack traces and internal details never leak to
 * the client. Server errors (5xx) are logged with their stack; client errors
 * (4xx) at warn level. Echoes `x-request-id` so every response is traceable.
 */
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<HttpReplyLike>();
    const request = ctx.getRequest<HttpRequestLike>();

    const isHttpException = exception instanceof HttpException;
    const status = isHttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;
    const message = isHttpException
      ? exception.getResponse()
      : 'Internal server error';

    const origin = `${request.method} ${request.url}`;
    if (status >= 500) {
      const detail =
        exception instanceof Error
          ? `${exception.name}: ${exception.message}`
          : String(exception);
      this.logger.error(
        `${origin} -> ${status} :: ${detail}`,
        exception instanceof Error ? exception.stack : undefined,
      );
    } else {
      this.logger.warn(`${origin} -> ${status}`);
    }

    const body: ErrorResponseBody = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
    };
    response.header('x-request-id', request.id).status(status).send(body);
  }
}
