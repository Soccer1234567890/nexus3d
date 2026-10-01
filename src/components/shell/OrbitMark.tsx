'use client';

import { useEffect, useState } from 'react';
import { msUntilNextMinute, orbitAngle, pointOnCircle } from '@/lib/time/orbit';

const SIZE = 22;
const CENTRE = SIZE / 2;
const RING_RADIUS = 8;
const SATELLITE_RADIUS = 2.25;

/**
 * The ORBIT mark: a ring with a satellite whose position is the current time
 * of day (one revolution per day, midnight at the top). The satellite is only
 * drawn after mount so server and client markup agree, and it moves once a
 * minute rather than on an animation loop.
 */
export function OrbitMark({ className }: { className?: string }) {
  const [angle, setAngle] = useState<number | null>(null);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      const now = new Date();
      setAngle(orbitAngle(now));
      timer = setTimeout(tick, msUntilNextMinute(now));
    };
    tick();
    return () => clearTimeout(timer);
  }, []);

  const satellite = angle === null ? null : pointOnCircle(angle, RING_RADIUS, CENTRE, CENTRE);

  return (
    <svg
      className={className}
      width={SIZE}
      height={SIZE}
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      aria-hidden="true"
      focusable="false"
    >
      <circle
        cx={CENTRE}
        cy={CENTRE}
        r={RING_RADIUS}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
      />
      <circle cx={CENTRE} cy={CENTRE} r="1.5" fill="currentColor" />
      {satellite ? (
        <circle
          cx={satellite.x}
          cy={satellite.y}
          r={SATELLITE_RADIUS}
          fill="var(--accent)"
          style={{ transition: 'cx 600ms ease, cy 600ms ease' }}
        />
      ) : null}
    </svg>
  );
}
