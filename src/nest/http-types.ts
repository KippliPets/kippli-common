/**
 * Minimal structural shapes for the request/response objects the filter and
 * interceptor touch. Defined here (rather than importing `FastifyRequest`/
 * `FastifyReply`) so this package carries no server-framework dependency —
 * Fastify's objects satisfy these interfaces structurally.
 */

export interface HttpRequestLike {
  method: string;
  url: string;
  /** Correlation id (Fastify's `req.id`). */
  id: string;
  headers: Record<string, string | string[] | undefined>;
}

export interface HttpReplyLike {
  header(key: string, value: unknown): HttpReplyLike;
  status(code: number): HttpReplyLike;
  send(body: unknown): unknown;
}
