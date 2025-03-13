import type { Metadata } from 'next';

import { Providers } from '@/app/providers';

import '@/styles/globals.scss';
import '@/styles/reset.scss';

export const metadata: Metadata = {
  title: 'Дом сомелье',
  description: 'Винный бутик Дом сомелье',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const reduxPreloadedState = {};

  return (
    <html lang="en">
      <body>
        <Providers reduxPreloadedState={reduxPreloadedState}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
