/**
 * Shared wire contracts — one source of truth for the request/response shapes
 * that cross app boundaries, imported by both the producer and the consumer so
 * they can't drift. Pure types only: this entrypoint has NO runtime dependency
 * (safe to import from a browser bundle or a Nest service alike).
 */

// --------------------------------------------------------------- api result
/**
 * The discriminated result of a typed API call. `ok` narrows to the data;
 * `noAccess` flags a 401/403 so the UI can render a permission gate.
 */
export type ApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; status: number; message: string; noAccess: boolean };

// ------------------------------------------------------------------ shipyard
/** Aggregate order/revenue stats for a campaign's Shipyard dashboard. */
export interface ShipyardStats {
  totalRevenue: number;
  pendingRevenue: number;
  refundedRevenue: number;
  netRevenue: number;
  orderCount: number;
  paidOrders: number;
}

/** One order row in the Shipyard list. */
export interface ShipyardOrder {
  id: string;
  /** Human-facing order number/reference. */
  reference: string;
  customerName: string | null;
  status: string;
  /** The support tier + category this order was placed against, if known. */
  tierName: string | null;
  category: string | null;
  amount: number;
  createdAt: string;
}

// ------------------------------------------------------------- support tiers
export interface PublicTierProduct {
  productId: string;
  sku: string | null;
  title: string | null;
  quantity: number;
}

export interface PublicSupportTierReward {
  type: 'product' | 'badge';
  id: string;
  name: string;
  description: string;
  details?: string;
  estimatedShipDate?: string | null;
  images?: string[];
  /** physical | digital — only present for `type: 'product'` rewards. */
  productType?: string;
}

export interface PublicSupportTierCategory {
  name: string;
  slug: string;
  sortOrder: number;
}

/** A campaign support tier as exposed to the public storefront (halo). */
export interface PublicSupportTier {
  id: string;
  slug: string;
  campaignSlug: string;
  campaignName: string;
  title: string;
  name: string;
  /** Price in integer cents. */
  price: number;
  description: string | null;
  /** Rendered HTML bullet list of what the tier includes. */
  whatsIncluded: string | null;
  imageUrl: string | null;
  /** Allotment cap — null means unlimited. */
  available: number | null;
  claimed: number;
  sortOrder: number;
  rewards: PublicSupportTierReward[];
  category: PublicSupportTierCategory | null;
  products: PublicTierProduct[];
  badges: string[];
}

// -------------------------------------------------------- email verification
/**
 * Body mykippli POSTs to Kippli One to send a member their verification email.
 * One is only the mailer; mykippli owns the token + verify URL.
 */
export interface StartEmailVerificationRequest {
  sub: string;
  email: string;
  name?: string;
  token: string;
  verifyUrl: string;
  /** ISO expiry used to render "expires …" in the email. */
  expiresAt?: string;
}

/** Body mykippli POSTs to Kippli One to send a member their welcome email. */
export interface WelcomeEmailRequest {
  email: string;
  name?: string;
}

/** Body One POSTs back to mykippli once a verification link is confirmed. */
export interface SetEmailVerifiedRequest {
  sub: string;
}

// ------------------------------------------------------------------ members
/** One row of the cross-service member admin list (mykippli → One). */
export interface MemberListEntry {
  sub: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  name: string;
  emailVerified: boolean;
  rewardPoints: number;
  referralClicks: number;
  createdAt: string;
  lastLoginAt: string | null;
}

/** A reward-points ledger entry as shown in the member admin. */
export interface MemberLedgerEntry {
  id: string;
  delta: number;
  balance: number;
  reason: string;
  actor: string;
  createdAt: string;
}

/** A member's full detail + recent points history. */
export interface MemberDetail extends MemberListEntry {
  ledger: MemberLedgerEntry[];
}

/** A paginated member list. */
export interface MemberList {
  items: MemberListEntry[];
  total: number;
  page: number;
  pageSize: number;
}
