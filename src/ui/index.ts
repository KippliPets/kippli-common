// Shared React shell for the Kippli apps (One, kppli, ledger, shipyard, vault):
// a common Header (with app switcher + user menu) and a themed Sidebar, plus the
// primitives they build on. Router-agnostic — the host injects a `Link` and the
// current path — so the same components work under react-router and Next.
//
//   import { Header, Sidebar, type NavGroup } from '@kippli/common/ui';
//
// Consumers must have React (peer dep) and a Tailwind v4 build that scans this
// package's dist (e.g. `@source "../node_modules/@kippli/common/dist/ui";`).
export { Icon, type IconName } from './icons';
export { Menu } from './menu';
export { AppSwitcher } from './app-switcher';
export { Header } from './header';
export { Sidebar } from './sidebar';
export type {
  SwitcherApp,
  NavItem,
  NavGroup,
  ShellLink,
  ShellLinkProps,
  ShellUser,
} from './types';
