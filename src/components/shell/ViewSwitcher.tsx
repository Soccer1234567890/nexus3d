'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'motion/react';
import { VIEWS, viewForPath } from './views';

/**
 * Segmented control for the three calendar views. The highlighted pill is a
 * single element that glides between items (layoutId), so switching views
 * reads as one object moving rather than two states swapping.
 */
export function ViewSwitcher() {
  const pathname = usePathname();
  const active = viewForPath(pathname);

  return (
    <nav aria-label="Calendar views">
      <ul className="bg-hairline relative flex items-center gap-0.5 rounded-[11px] p-0.5">
        {VIEWS.map((view) => {
          const isActive = view.id === active.id;
          return (
            <li key={view.id} className="relative">
              {isActive ? (
                <motion.span
                  layoutId="view-switcher-pill"
                  className="bg-surface shadow-float absolute inset-0 rounded-[9px]"
                  transition={{ type: 'spring', bounce: 0, duration: 0.35 }}
                  aria-hidden="true"
                />
              ) : null}
              <Link
                href={view.href}
                aria-current={isActive ? 'page' : undefined}
                className={[
                  'relative z-10 flex h-8 min-w-[4.25rem] items-center justify-center rounded-[9px] px-3 text-[0.8125rem] font-medium tracking-[-0.005em] transition-colors duration-150 select-none active:scale-[0.97] active:transition-transform',
                  isActive ? 'text-ink' : 'text-ink-muted hover:text-ink',
                ].join(' ')}
              >
                {view.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
