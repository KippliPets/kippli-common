export interface InternalHttpClientOptions {
  /** Base URL of the target service; a trailing slash is trimmed. */
  baseUrl: string;
  /** The shared internal secret (from config). Absent → calls fail closed. */
  secret: string | undefined;
  /** Override the fetch implementation (for tests). Defaults to global fetch. */
  fetchImpl?: typeof fetch;
}

/** Error thrown for any failed internal call, with the HTTP status when known. */
export class InternalHttpError extends Error {
  readonly status?: number;

  constructor(message: string, status?: number, options?: { cause?: unknown }) {
    super(message, options);
    this.name = 'InternalHttpError';
    this.status = status;
  }
}

/**
 * A tiny typed client for server-to-server ("internal") calls between the Kippli
 * apps. It normalizes the base URL, attaches the `x-internal-secret` header, and
 * maps every transport/HTTP failure to a single {@link InternalHttpError} — so a
 * new S2S call is a one-liner instead of hand-rolled fetch boilerplate (URL
 * joining, the header, try/catch, status checks) copy-pasted per call site.
 *
 * @example
 * ```ts
 * const mykippli = new InternalHttpClient({ baseUrl: cfg.mykippliApiUrl, secret: cfg.internalServiceSecret });
 * const members = await mykippli.get<MemberList>('/internal/members?page=1');
 * await mykippli.post<{ ok: true }>('/internal/users/email-verified', { sub });
 * ```
 */
export class InternalHttpClient {
  private readonly baseUrl: string;
  private readonly secret: string | undefined;
  private readonly fetchImpl: typeof fetch;

  constructor(options: InternalHttpClientOptions) {
    this.baseUrl = options.baseUrl.replace(/\/+$/, '');
    this.secret = options.secret;
    this.fetchImpl = options.fetchImpl ?? fetch;
  }

  /** POST a JSON body and parse the JSON response as `T`. */
  post<T = unknown>(path: string, body?: unknown): Promise<T> {
    return this.request<T>('POST', path, body);
  }

  /** GET and parse the JSON response as `T`. */
  get<T = unknown>(path: string): Promise<T> {
    return this.request<T>('GET', path);
  }

  private async request<T>(
    method: string,
    path: string,
    body?: unknown,
  ): Promise<T> {
    if (!this.secret) {
      throw new InternalHttpError('Internal service secret is not configured');
    }
    const url = `${this.baseUrl}${path.startsWith('/') ? path : `/${path}`}`;
    const headers: Record<string, string> = { 'x-internal-secret': this.secret };
    if (body !== undefined) headers['content-type'] = 'application/json';

    let res: Response;
    try {
      res = await this.fetchImpl(url, {
        method,
        headers,
        body: body !== undefined ? JSON.stringify(body) : undefined,
      });
    } catch (cause) {
      throw new InternalHttpError(
        `Internal ${method} ${url} failed to send`,
        undefined,
        { cause },
      );
    }
    if (!res.ok) {
      throw new InternalHttpError(
        `Internal ${method} ${url} failed (HTTP ${res.status})`,
        res.status,
      );
    }
    // A 204 / empty body parses to `undefined`.
    const text = await res.text();
    return (text ? JSON.parse(text) : undefined) as T;
  }
}
