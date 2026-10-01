export type ViewId = 'today' | 'week' | 'month';

export interface ViewDefinition {
  id: ViewId;
  label: string;
  href: '/' | '/week' | '/month';
}

export const VIEWS: readonly ViewDefinition[] = [
  { id: 'today', label: 'Today', href: '/' },
  { id: 'week', label: 'Week', href: '/week' },
  { id: 'month', label: 'Month', href: '/month' },
] as const;

/** Resolve the active view from a pathname; unknown paths fall back to Today. */
export function viewForPath(pathname: string): ViewDefinition {
  const match = VIEWS.find((view) => view.href !== '/' && pathname.startsWith(view.href));
  return match ?? VIEWS[0]!;
}
