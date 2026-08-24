import type { ReactNode } from 'react';
import { AppSwitcher } from './app-switcher';
import { PawMark } from './icons';
import { Sidebar } from './sidebar';
import { UserMenu } from './user-menu';
import type { NavGroup, ShellLink, ShellUser, SwitcherApp } from './types';

/**
 * The canonical Kippli dashboard chrome, shared across every app (One, kppli,
 * ledger, shipyard, vault): a full-width header with the Kippli brand cell over
 * the sidebar column, the current app's name, the app switcher, and the user
 * menu — above the grouped sidebar and the scrollable main content.
 *
 * Everything app-specific is injected: the app's `navGroups`, its `apps` list
 * for the switcher (`/applications/mine`), the `user` + `onSignOut`, the current
 * path, and a router `Link`. So the same shell renders identically under
 * react-router or any other router.
 */
export function AppShell({
  appName,
  apps,
  user,
  onSignOut,
  profileHref,
  navGroups,
  currentPath,
  Link,
  children,
}: {
  appName: string;
  apps: SwitcherApp[];
  user: ShellUser | null;
  onSignOut: () => void;
  profileHref?: string;
  navGroups: NavGroup[];
  currentPath: string;
  Link: ShellLink;
  children: ReactNode;
}) {
  return (
    <div className="flex h-dvh flex-col bg-zinc-50 text-zinc-900">
      <header className="relative z-10 flex h-16 shrink-0 items-center border-b border-zinc-200 bg-white shadow-sm">
        {/* Brand cell — aligned over the sidebar, its right border continues the
            sidebar's vertical divider. */}
        <div className="flex h-full w-64 shrink-0 items-center gap-2 border-r border-zinc-200 px-5">
          <PawMark className="size-8 text-teal-500" />
          <span className="text-lg font-semibold tracking-tight text-zinc-900">
            Kippli
          </span>
        </div>

        {/* Main header: current app name (left) + switcher & user menu (right). */}
        <div className="flex flex-1 items-center justify-between px-5">
          <span className="text-sm font-semibold tracking-tight text-zinc-700">
            {appName}
          </span>
          <div className="flex items-center gap-1">
            <AppSwitcher apps={apps} />
            <div className="mx-1.5 h-6 w-px bg-zinc-200" />
            <UserMenu
              user={user}
              onSignOut={onSignOut}
              profileHref={profileHref}
            />
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <Sidebar groups={navGroups} currentPath={currentPath} Link={Link} />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
