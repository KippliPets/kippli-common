import type { ComponentType, ReactNode } from 'react';
import type { IconName } from './icons';

/** One entry in the app-switcher grid (from the One API's `/applications/mine`). */
export interface SwitcherApp {
  slug: string;
  name: string;
  url: string;
  logoUrl?: string | null;
}

/** A single left-nav destination. `exact` matches the path exactly (for roots). */
export interface NavItem {
  label: string;
  href: string;
  icon: IconName;
  exact?: boolean;
}

/** A titled group of nav items in the sidebar. */
export interface NavGroup {
  title: string;
  items: NavItem[];
}

/**
 * A router-agnostic link the shell renders for in-app navigation. Each app
 * supplies a component that maps `{ href, className, children }` to its own
 * router (react-router `Link`, or a `next/link` wrapper). Active styling is
 * handled by the shell via `className`, so the component only needs to navigate.
 */
export interface ShellLinkProps {
  href: string;
  className?: string;
  children: ReactNode;
}
export type ShellLink = ComponentType<ShellLinkProps>;

/** The signed-in user, as the header renders it. */
export interface ShellUser {
  name: string;
  email?: string;
}
