import type { Metadata } from 'next';
import '@/styles/global.css';

export const metadata: Metadata = {
  icons: {
    icon: '/images/rare-candy.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
