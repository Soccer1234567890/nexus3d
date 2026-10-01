import type { Metadata, Viewport } from 'next';
import { AppShell } from '@/components/shell/AppShell';
import { MotionProvider } from '@/components/shell/MotionProvider';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'ORBIT',
    template: '%s · ORBIT',
  },
  description:
    'A lightweight personal command center. Your events, tasks and notes orbit around today.',
  applicationName: 'ORBIT',
};

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f6f6f4' },
    { media: '(prefers-color-scheme: dark)', color: '#0f0f12' },
  ],
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en">
      <body>
        <MotionProvider>
          <AppShell>{children}</AppShell>
        </MotionProvider>
      </body>
    </html>
  );
}
