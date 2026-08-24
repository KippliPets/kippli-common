import { Icon } from './icons';
import { Menu } from './menu';
import type { ShellUser } from './types';

/**
 * The signed-in user's dropdown in the shared header: an avatar-initial trigger,
 * the name/email, and a sign-out action. `onSignOut` is injected because each
 * app's auth differs. An optional `profileHref` adds a "Profile" link when the
 * host has one.
 */
export function UserMenu({
  user,
  onSignOut,
  profileHref,
}: {
  user: ShellUser | null;
  onSignOut: () => void;
  profileHref?: string;
}) {
  const displayName = user?.name?.trim() || user?.email || 'User';
  const email = user?.email ?? '';
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <Menu
      triggerLabel="Account menu"
      triggerClassName="flex size-9 items-center justify-center rounded-full bg-teal-100 text-sm font-semibold text-teal-700 transition-colors hover:bg-teal-200"
      trigger={<span>{initial}</span>}
      panelClassName="w-60"
    >
      <div className="border-b border-zinc-100 px-3 py-2.5">
        <p className="truncate text-sm font-medium text-zinc-800">
          {displayName}
        </p>
        {email ? (
          <p className="truncate text-xs text-zinc-500">{email}</p>
        ) : null}
      </div>
      {profileHref ? (
        <a
          href={profileHref}
          role="menuitem"
          className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-zinc-700 transition-colors hover:bg-zinc-100"
        >
          <Icon name="settings" className="size-4 text-zinc-400" />
          Profile
        </a>
      ) : null}
      <button
        type="button"
        role="menuitem"
        onClick={onSignOut}
        className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm text-zinc-700 transition-colors hover:bg-zinc-100"
      >
        <Icon name="logout" className="size-4 text-zinc-400" />
        Sign out
      </button>
    </Menu>
  );
}
