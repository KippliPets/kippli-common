import { Icon } from './icons';
import { Menu } from './menu';
import type { SwitcherApp } from './types';

/**
 * Google-style app-switcher grid for the shared header. Lists the enabled
 * applications the current user can open and links each out to its own URL in a
 * new tab. Cross-app links are plain <a> (they leave the current app entirely),
 * so this is fully router-agnostic. The `apps` are supplied by the host app
 * (typically fetched from the One API's `/applications/mine`).
 */
export function AppSwitcher({ apps }: { apps: SwitcherApp[] }) {
  return (
    <Menu
      triggerLabel="App switcher"
      triggerClassName="flex size-9 items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-700"
      trigger={<Icon name="grid" className="size-5" />}
      panelClassName="w-72"
    >
      <p className="px-2 pb-1.5 pt-1 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
        Applications
      </p>

      {apps.length === 0 ? (
        <p className="px-2 pb-2 pt-1 text-sm text-zinc-500">No apps yet</p>
      ) : (
        <div className="grid grid-cols-3 gap-0.5">
          {apps.map((app) => (
            <a
              key={app.slug}
              href={app.url}
              target="_blank"
              rel="noopener noreferrer"
              role="menuitem"
              title={app.name}
              className="flex flex-col items-center gap-1.5 rounded-lg px-1 py-3 text-center transition-colors hover:bg-zinc-100"
            >
              <span
                className={`flex size-10 items-center justify-center overflow-hidden rounded-xl text-zinc-500 ${
                  app.logoUrl ? '' : 'bg-zinc-100'
                }`}
              >
                {app.logoUrl ? (
                  <img
                    src={app.logoUrl}
                    alt=""
                    className="size-full object-contain"
                  />
                ) : (
                  <Icon name="cube" className="size-5" />
                )}
              </span>
              <span className="w-full truncate text-xs leading-tight text-zinc-700">
                {app.name}
              </span>
            </a>
          ))}
        </div>
      )}
    </Menu>
  );
}
