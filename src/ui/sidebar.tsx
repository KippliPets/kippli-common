import { Icon } from './icons';
import type { NavGroup, ShellLink } from './types';

/** Active when the path equals the item (exact) or sits under it (prefix). */
function isActive(href: string, currentPath: string, exact?: boolean): boolean {
  if (exact) return currentPath === href;
  return currentPath === href || currentPath.startsWith(`${href}/`);
}

/**
 * The shared left-nav shell: grouped links with the common Kippli theme (white
 * surface, teal active state, zinc text). Nav CONTENT is per-app (`groups`), and
 * navigation is router-agnostic — the host passes `currentPath` (from its router)
 * and a `Link` component that the shell wraps each item in. Active styling is
 * computed here, so `Link` only has to navigate.
 */
export function Sidebar({
  groups,
  currentPath,
  Link,
}: {
  groups: NavGroup[];
  currentPath: string;
  Link: ShellLink;
}) {
  return (
    <aside className="w-60 shrink-0 overflow-y-auto border-r border-zinc-200 bg-white">
      <nav className="px-3 py-4">
        {groups.map((group) => (
          <div key={group.title} className="mb-5">
            <p className="px-3 pb-1 text-[11px] font-semibold uppercase tracking-wide text-zinc-400">
              {group.title}
            </p>
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const active = isActive(item.href, currentPath, item.exact);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`flex items-center gap-2.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                        active
                          ? 'bg-teal-50 text-teal-700'
                          : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900'
                      }`}
                    >
                      <Icon name={item.icon} className="size-4 shrink-0" />
                      <span className="truncate">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
