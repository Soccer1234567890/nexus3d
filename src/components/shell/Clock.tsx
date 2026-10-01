'use client';

import { useEffect, useState } from 'react';
import { formatClock, formatShortDate, msUntilNextMinute } from '@/lib/time/orbit';

/**
 * Date and time readout for the top bar. Rendered empty on the server and
 * filled on the client so hydration never sees a different minute. Ticks on
 * the minute boundary, not on an interval, so it is both exact and cheap.
 */
export function Clock() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      const current = new Date();
      setNow(current);
      timer = setTimeout(tick, msUntilNextMinute(current));
    };
    tick();
    return () => clearTimeout(timer);
  }, []);

  return (
    <time
      className="type-caption tabular flex items-baseline gap-2 whitespace-nowrap"
      dateTime={now?.toISOString()}
      aria-live="off"
    >
      {now ? (
        <>
          <span className="hidden sm:inline">{formatShortDate(now)}</span>
          <span className="text-ink font-medium">{formatClock(now)}</span>
        </>
      ) : (
        // Reserve the space so the bar does not shift when the time arrives.
        <span className="inline-block w-[5.5rem] sm:w-[9rem]" aria-hidden="true" />
      )}
    </time>
  );
}
