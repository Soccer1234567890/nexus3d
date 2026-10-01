import type { ViewDefinition } from './views';

/**
 * Temporary body for each view until its real screen lands. Written as an
 * invitation to act rather than a "coming soon" sign, so the empty state
 * already reads in the product's voice.
 */
export function ViewPlaceholder({ view, lead }: { view: ViewDefinition; lead: string }) {
  return (
    <section aria-labelledby={`${view.id}-heading`} className="max-w-[36rem]">
      <p className="type-eyebrow mb-3">{view.label}</p>
      <h1 id={`${view.id}-heading`} className="type-display text-ink">
        {lead}
      </h1>
      <p className="type-body text-ink-muted mt-4">
        Nothing is scheduled yet. Events, tasks and notes will appear here once you add them.
      </p>
    </section>
  );
}
