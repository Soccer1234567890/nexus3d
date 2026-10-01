import type { ReactNode } from 'react';
import Link from 'next/link';
import { Clock } from './Clock';
import { OrbitMark } from './OrbitMark';
import { ViewSwitcher } from './ViewSwitcher';

/**
 * Persistent frame: a translucent top bar with the wordmark, the view
 * switcher and the clock, then the view underneath. Content scrolls under
 * the bar, which is why the bar is a material rather than an opaque strip.
 */
export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <header className="material-bar sticky top-0 z-20">
        <div className="mx-auto grid h-topbar max-w-[1200px] grid-cols-[1fr_auto_1fr] items-center gap-3 px-4 sm:px-6">
          <Link
            href="/"
            className="text-ink flex w-fit items-center gap-2 rounded-md"
            aria-label="ORBIT, today"
          >
            <OrbitMark />
            <span className="type-eyebrow text-ink hidden sm:inline">Orbit</span>
          </Link>
          <ViewSwitcher />
          <div className="flex justify-end">
            <Clock />
          </div>
        </div>
        <div className="bg-hairline h-px" aria-hidden="true" />
      </header>
      <main id="content" className="mx-auto w-full max-w-[1200px] flex-1 px-4 py-6 sm:px-6 sm:py-8">
        {children}
      </main>
    </div>
  );
}
