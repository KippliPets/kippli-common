import type { ReactNode } from "react";

/**
 * Inline line-icon set for the dashboard shell. No external icon deps.
 * Each entry is the inner geometry of a 24x24 icon; `Icon` supplies the shared
 * <svg> wrapper (1.5 stroke, round caps, currentColor).
 */
export type IconName =
  | "dashboard"
  | "users"
  | "shield"
  | "key"
  | "grid"
  | "cube"
  | "mail"
  | "bell"
  | "trash"
  | "settings"
  | "file"
  | "factory"
  | "megaphone"
  | "image"
  | "images"
  | "map"
  | "scale"
  | "chart"
  | "search"
  | "link"
  | "stethoscope"
  | "hospital"
  | "syringe"
  | "bowl"
  | "grip"
  | "chevron-down"
  // Superset additions (shipyard, vault, user-menu):
  | "award"
  | "box"
  | "heart"
  | "inbox"
  | "scroll"
  | "logout"
  | "ellipsis"
  | "download"
  | "clinic"
  | "handshake"
  | "layers"
  | "pen"
  | "wand";

const ICONS: Record<IconName, ReactNode> = {
  grip: (
    <>
      <circle cx="9" cy="6" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="15" cy="6" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="9" cy="12" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="15" cy="12" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="9" cy="18" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="15" cy="18" r="1.1" fill="currentColor" stroke="none" />
    </>
  ),
  dashboard: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M4 19a5 5 0 0 1 10 0" />
      <path d="M16 6a3 3 0 0 1 0 6" />
      <path d="M20 19a5 5 0 0 0-3.6-4.5" />
    </>
  ),
  shield: <path d="M12 3l7 3v5c0 4.5-3 7.6-7 9-4-1.4-7-4.5-7-9V6l7-3z" />,
  key: (
    <>
      <circle cx="7.5" cy="15.5" r="4.5" />
      <path d="m10.8 12.2 9.2-9.2" />
      <path d="m16.5 6.5 2.5 2.5" />
    </>
  ),
  grid: (
    <>
      {[5, 12, 19].map((cy) =>
        [5, 12, 19].map((cx) => (
          <circle
            key={`${cx}-${cy}`}
            cx={cx}
            cy={cy}
            r="1.6"
            fill="currentColor"
            stroke="none"
          />
        )),
      )}
    </>
  ),
  cube: (
    <>
      <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" />
      <path d="M4 7.5l8 4.5 8-4.5" />
      <path d="M12 12v9" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M4 7l8 6 8-6" />
    </>
  ),
  bell: (
    <>
      <path d="M18 8a6 6 0 1 0-12 0c0 6-2 7-2 7h16s-2-1-2-7z" />
      <path d="M10 20a2 2 0 0 0 4 0" />
    </>
  ),
  trash: (
    <>
      <path d="M3 6h18" />
      <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
    </>
  ),
  settings: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-2.7 1.1V21a2 2 0 0 1-4 0v-.2a1.6 1.6 0 0 0-2.7-1.1l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1A1.6 1.6 0 0 0 3.8 14H3.6a2 2 0 0 1 0-4h.2a1.6 1.6 0 0 0 1.1-2.7l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1A1.6 1.6 0 0 0 10 3.8V3.6a2 2 0 0 1 4 0v.2a1.6 1.6 0 0 0 2.7 1.1l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.8z" />
    </>
  ),
  file: (
    <>
      <path d="M13 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V9z" />
      <path d="M13 3v6h6" />
      <path d="M9 13h6" />
      <path d="M9 17h4" />
    </>
  ),
  factory: (
    <>
      <path d="M3 20a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V9l-6 4V9l-6 4V5a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1z" />
      <path d="M7 17h.01M12 17h.01M17 17h.01" />
    </>
  ),
  megaphone: (
    <>
      <path d="M4 10v4a1 1 0 0 0 1 1h3l6 4V5L8 9H5a1 1 0 0 0-1 1z" />
      <path d="M18 9a4 4 0 0 1 0 6" />
    </>
  ),
  image: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <circle cx="8.5" cy="9" r="1.5" />
      <path d="M4 17l5-5 4 4 2-2 5 5" />
    </>
  ),
  images: (
    <>
      <rect x="8" y="3" width="13" height="10" rx="2" />
      <path d="M8 8H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-3" />
    </>
  ),
  map: (
    <>
      <path d="M15 5.5 20 3v15.5L15 21l-6-2.5L4 21V5.5L9 3z" />
      <path d="M9 3v15.5" />
      <path d="M15 5.5V21" />
    </>
  ),
  scale: (
    <>
      <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
      <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
      <path d="M7 21h10" />
      <path d="M12 3v18" />
      <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" />
    </>
  ),
  chart: (
    <>
      <path d="M3 3v16a2 2 0 0 0 2 2h16" />
      <path d="M7 14l3-4 3 2 4-6" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </>
  ),
  link: (
    <>
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </>
  ),
  stethoscope: (
    <>
      <path d="M4 3H3a1 1 0 0 0-1 1v5a6 6 0 0 0 12 0V4a1 1 0 0 0-1-1h-1" />
      <path d="M8 15v1a6 6 0 0 0 6 6 5 5 0 0 0 5-5v-3" />
      <circle cx="20" cy="10" r="2" />
    </>
  ),
  hospital: (
    <>
      <path d="M3 22V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v16" />
      <line x1="2" y1="22" x2="22" y2="22" />
      <path d="M10 22v-3a2 2 0 0 1 4 0v3" />
      <path d="M12 7v4M10 9h4" />
    </>
  ),
  syringe: (
    <>
      <path d="m18 2 4 4" />
      <path d="m17 7 3-3" />
      <path d="M19 9 8.7 19.3a2.4 2.4 0 0 1-3.4 0l-.6-.6a2.4 2.4 0 0 1 0-3.4L15 5z" />
      <path d="m9 11 4 4" />
      <path d="m5 19-3 3" />
    </>
  ),
  bowl: (
    <>
      <path d="M2 11h20a10 10 0 0 1-20 0z" />
      <path d="M7 11a5 5 0 0 1 10 0" />
      <path d="M12 3v3" />
    </>
  ),
  "chevron-down": <polyline points="6 9 12 15 18 9" />,
  award: (
    <>
      <circle cx="12" cy="8" r="6" />
      <path d="M8.21 13.89 7 22l5-3 5 3-1.21-8.11" />
    </>
  ),
  box: (
    <>
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </>
  ),
  heart: (
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z" />
  ),
  inbox: (
    <>
      <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
      <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
    </>
  ),
  scroll: (
    <>
      <path d="M8 21h12a2 2 0 0 0 2-2v-2H10v2a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v3h4" />
      <path d="M19 17V5a2 2 0 0 0-2-2H4" />
    </>
  ),
  logout: (
    <>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </>
  ),
  ellipsis: (
    <>
      <circle cx="12" cy="12" r="1" />
      <circle cx="19" cy="12" r="1" />
      <circle cx="5" cy="12" r="1" />
    </>
  ),
  download: (
    <>
      <path d="M12 3v12" />
      <path d="m7 10 5 5 5-5" />
      <path d="M5 21h14" />
    </>
  ),
  clinic: (
    <>
      <rect x="3" y="7" width="18" height="14" rx="1" />
      <path d="M12 3v4" />
      <path d="M10 13h4" />
      <path d="M12 11v4" />
    </>
  ),
  handshake: (
    <>
      <path d="M6 11 3.5 8.5a2.12 2.12 0 0 1 3-3L12 11" />
      <path d="m12 11 5.5-5.5a2.12 2.12 0 0 1 3 3L18 13" />
      <path d="m8 13 2 2a2 2 0 0 0 3 0l4-4" />
    </>
  ),
  layers: (
    <>
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </>
  ),
  pen: (
    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
  ),
  wand: (
    <>
      <path d="m3 21 15-15" />
      <path d="m15 6 3 3" />
      <path d="M9 3v2M5 7H3M19 13v2M21 15h-2" />
    </>
  ),
};

export function Icon({
  name,
  className = "h-[18px] w-[18px] shrink-0",
}: {
  // Accept any string so an app can pass a nav icon the superset doesn't know
  // yet; unknown names fall back to a neutral mark rather than rendering blank.
  name: IconName | (string & {});
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {ICONS[name as IconName] ?? ICONS.cube}
    </svg>
  );
}

/** Kippli brand mark — a filled teal paw print. */
export function PawMark({
  className = "h-7 w-7 text-teal-500",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <ellipse cx="6" cy="11" rx="1.9" ry="2.5" />
      <ellipse cx="10.3" cy="7.3" rx="1.9" ry="2.6" />
      <ellipse cx="14.7" cy="7.3" rx="1.9" ry="2.6" />
      <ellipse cx="18.5" cy="11.4" rx="1.9" ry="2.5" />
      <path d="M12.3 12.4c2.9 0 5.2 2 5.2 4.3 0 2-1.7 3-3.4 3-1 0-1.3-.3-1.9-.3s-.9.3-1.9.3c-1.7 0-3.4-1-3.4-3 0-2.3 2.4-4.3 5.4-4.3z" />
    </svg>
  );
}
