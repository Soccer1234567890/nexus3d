import type { Metadata } from 'next';
import { ViewPlaceholder } from '@/components/shell/ViewPlaceholder';
import { VIEWS } from '@/components/shell/views';

export const metadata: Metadata = { title: 'Month' };

export default function MonthPage() {
  return <ViewPlaceholder view={VIEWS[2]!} lead="The month at a glance." />;
}
