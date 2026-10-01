/**
 * Pure time helpers for the ORBIT mark and clock.
 * Kept free of DOM and React so they are trivial to unit test.
 */

const MINUTES_PER_DAY = 24 * 60;

/**
 * Angle, in degrees clockwise from 12 o'clock, of the satellite on the orbital
 * mark for a given moment. One full revolution is one day, so 06:00 is 90°,
 * 12:00 is 180° and 18:00 is 270°.
 */
export function orbitAngle(date: Date): number {
  const minutes = date.getHours() * 60 + date.getMinutes();
  return (minutes / MINUTES_PER_DAY) * 360;
}

/**
 * Position of a point on a circle, for an angle measured clockwise from 12
 * o'clock. Values are rounded to 3 decimals so server and client markup match.
 */
export function pointOnCircle(
  angleDeg: number,
  radius: number,
  cx = 0,
  cy = 0,
): { x: number; y: number } {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  const round = (n: number) => Math.round(n * 1000) / 1000;
  return { x: round(cx + radius * Math.cos(rad)), y: round(cy + radius * Math.sin(rad)) };
}

/** 24-hour clock text such as "09:05". */
export function formatClock(date: Date): string {
  const hh = String(date.getHours()).padStart(2, '0');
  const mm = String(date.getMinutes()).padStart(2, '0');
  return `${hh}:${mm}`;
}

/**
 * Short day text such as "Thu 1 Oct". Assembled from locale parts rather than
 * the locale's own joined output, because ICU builds differ on punctuation
 * (Node prints "Thu 1 Oct" where Chromium prints "Thu, 1 Oct").
 */
export function formatShortDate(date: Date, locale = 'en-GB'): string {
  const parts = new Intl.DateTimeFormat(locale, {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  }).formatToParts(date);
  const pick = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? '';
  return `${pick('weekday')} ${pick('day')} ${pick('month')}`;
}

/** Milliseconds until the next whole minute, so a clock ticks exactly on :00. */
export function msUntilNextMinute(date: Date): number {
  return 60_000 - (date.getSeconds() * 1000 + date.getMilliseconds());
}
