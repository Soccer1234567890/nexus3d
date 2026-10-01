import { ViewPlaceholder } from '@/components/shell/ViewPlaceholder';
import { VIEWS } from '@/components/shell/views';

export default function TodayPage() {
  return <ViewPlaceholder view={VIEWS[0]!} lead="Today is clear." />;
}
