import type { Metadata } from 'next';
import { ViewPlaceholder } from '@/components/shell/ViewPlaceholder';
import { VIEWS } from '@/components/shell/views';

export const metadata: Metadata = { title: 'Week' };

export default function WeekPage() {
  return <ViewPlaceholder view={VIEWS[1]!} lead="A quiet week ahead." />;
}
