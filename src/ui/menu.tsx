import { useEffect, useId, useRef, useState, type ReactNode } from 'react';

/**
 * Minimal accessible dropdown. The trigger is a real <button> (keyboard
 * focusable, toggles on Enter/Space/click); the panel opens below it and closes
 * on Escape, an outside click, or a click on any menu item inside. Framework-
 * agnostic (no router imports) so it ports cleanly to the shared shell.
 */
export function Menu({
  trigger,
  triggerClassName,
  triggerLabel,
  align = 'right',
  panelClassName = 'w-64',
  children,
}: {
  trigger: ReactNode;
  triggerClassName?: string;
  triggerLabel?: string;
  align?: 'left' | 'right';
  panelClassName?: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    function onPointerDown(event: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false);
    }
    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        aria-label={triggerLabel}
        onClick={() => setOpen((prev) => !prev)}
        className={triggerClassName}
      >
        {trigger}
      </button>
      {open ? (
        <div
          id={panelId}
          role="menu"
          // Close after a menu item is activated (a link opens a new tab, then
          // the dropdown tidies itself away).
          onClick={() => setOpen(false)}
          className={`absolute top-full z-50 mt-2 ${
            align === 'right' ? 'right-0' : 'left-0'
          } ${panelClassName} rounded-xl border border-zinc-200 bg-white p-1.5 shadow-lg ring-1 ring-black/5`}
        >
          {children}
        </div>
      ) : null}
    </div>
  );
}
