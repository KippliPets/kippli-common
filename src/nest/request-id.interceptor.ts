import {
  type CallHandler,
  type ExecutionContext,
  Injectable,
  type NestInterceptor,
} from '@nestjs/common';
import type { Observable } from 'rxjs';
import type { HttpReplyLike, HttpRequestLike } from './http-types';

/**
 * Echoes the request's correlation id (Fastify's `req.id`, configured from the
 * `x-request-id` header or a fresh UUID at bootstrap) back on the response, so a
 * client can tie a response to its server-side logs. Error responses get the
 * same header from {@link AllExceptionsFilter}.
 */
@Injectable()
export class RequestIdInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const http = context.switchToHttp();
    const request = http.getRequest<HttpRequestLike>();
    const reply = http.getResponse<HttpReplyLike>();
    reply.header('x-request-id', request.id);
    return next.handle();
  }
}
