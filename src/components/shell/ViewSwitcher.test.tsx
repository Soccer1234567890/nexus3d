import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ViewSwitcher } from './ViewSwitcher';
import { viewForPath } from './views';

const pathname = vi.hoisted(() => ({ current: '/' }));

vi.mock('next/navigation', () => ({
  usePathname: () => pathname.current,
}));

describe('viewForPath', () => {
  it('resolves each route to its view', () => {
    expect(viewForPath('/').id).toBe('today');
    expect(viewForPath('/week').id).toBe('week');
    expect(viewForPath('/month').id).toBe('month');
  });

  it('falls back to Today for unknown paths', () => {
    expect(viewForPath('/settings').id).toBe('today');
  });
});

describe('ViewSwitcher', () => {
  it('renders the three views as links inside a labelled nav', () => {
    pathname.current = '/';
    render(<ViewSwitcher />);
    const nav = screen.getByRole('navigation', { name: 'Calendar views' });
    const links = screen.getAllByRole('link');
    expect(nav).toBeInTheDocument();
    expect(links.map((link) => link.textContent)).toEqual(['Today', 'Week', 'Month']);
    expect(links.map((link) => link.getAttribute('href'))).toEqual(['/', '/week', '/month']);
  });

  it('marks only the active view with aria-current', () => {
    pathname.current = '/week';
    render(<ViewSwitcher />);
    expect(screen.getByRole('link', { name: 'Week' })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('link', { name: 'Today' })).not.toHaveAttribute('aria-current');
    expect(screen.getByRole('link', { name: 'Month' })).not.toHaveAttribute('aria-current');
  });
});
