import { describe, expect, it } from 'vitest';
import {
  formatClock,
  formatShortDate,
  msUntilNextMinute,
  orbitAngle,
  pointOnCircle,
} from './orbit';

const at = (h: number, m: number, s = 0, ms = 0) => new Date(2026, 9, 1, h, m, s, ms);

describe('orbitAngle', () => {
  it('maps midnight to 0° and noon to 180°', () => {
    expect(orbitAngle(at(0, 0))).toBe(0);
    expect(orbitAngle(at(12, 0))).toBe(180);
  });

  it('maps quarter days to quarter turns', () => {
    expect(orbitAngle(at(6, 0))).toBe(90);
    expect(orbitAngle(at(18, 0))).toBe(270);
  });

  it('stays strictly below 360° at the end of the day', () => {
    expect(orbitAngle(at(23, 59))).toBeLessThan(360);
  });
});

describe('pointOnCircle', () => {
  it('places 0° at the top of the circle', () => {
    expect(pointOnCircle(0, 10)).toEqual({ x: 0, y: -10 });
  });

  it('places 90° at the right and 180° at the bottom', () => {
    expect(pointOnCircle(90, 10)).toEqual({ x: 10, y: 0 });
    expect(pointOnCircle(180, 10)).toEqual({ x: 0, y: 10 });
  });

  it('offsets by the centre and rounds to 3 decimals', () => {
    expect(pointOnCircle(45, 10, 12, 12)).toEqual({ x: 19.071, y: 4.929 });
  });
});

describe('formatClock', () => {
  it('zero-pads hours and minutes', () => {
    expect(formatClock(at(9, 5))).toBe('09:05');
    expect(formatClock(at(23, 59))).toBe('23:59');
  });
});

describe('formatShortDate', () => {
  it('renders weekday, day and month', () => {
    expect(formatShortDate(at(10, 0))).toBe('Thu 1 Oct');
  });
});

describe('msUntilNextMinute', () => {
  it('returns a full minute exactly on the minute', () => {
    expect(msUntilNextMinute(at(10, 0, 0, 0))).toBe(60_000);
  });

  it('returns the remainder mid-minute', () => {
    expect(msUntilNextMinute(at(10, 0, 30, 250))).toBe(29_750);
  });
});
