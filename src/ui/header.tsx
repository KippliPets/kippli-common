import { AppSwitcher } from './app-switcher';
import type { ShellUser, SwitcherApp } from './types';

/**
 * The shared top bar for every Kippli app: the app's own brand on the left, and
 * on the right the app switcher, the signed-in user, and a sign-out action. The
 * host supplies the app name, the switcher's `apps`, the `user`, and an
 * `onSignOut` handler (each app's auth differs, so sign-out is injected).
 */
export function Header({
  appName,
  apps,
  user,
  onSignOut,
}: {
  appName: string;
  apps: SwitcherApp[];
  user: ShellUser | null;
  onSignOut: () => void;
}) {
  const displayName = user?.name?.trim() || user?.email || 'User';
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-zinc-200 bg-white px-4">
      <span className="text-sm font-semibold tracking-tight text-zinc-900">
        {appName}
      </span>
      <div className="flex items-center gap-3">
        <AppSwitcher apps={apps} />
        {user ? (
          <div className="text-right leading-tight">
            <p className="text-sm font-medium text-zinc-800">{displayName}</p>
            {user.email ? (
              <p className="text-xs text-zinc-500">{user.email}</p>
            ) : null}
          </div>
        ) : null}
        <div className="flex size-8 items-center justify-center rounded-full bg-teal-100 text-sm font-semibold text-teal-700">
          {initial}
        </div>
        <button
          type="button"
          onClick={onSignOut}
          className="rounded-lg border border-zinc-200 px-3 py-1.5 text-sm font-medium text-zinc-600 hover:bg-zinc-50"
        >
          Sign out
        </button>
      </div>
    </header>
  );
}
