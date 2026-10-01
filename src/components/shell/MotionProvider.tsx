'use client';

import type { ReactNode } from 'react';
import { MotionConfig } from 'motion/react';

/** Honour the system reduced-motion setting for every Motion animation. */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
