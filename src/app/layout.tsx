import type { Metadata } from 'next';
import localFont from 'next/font/local';

import { Providers } from '@/app/providers';

import '@/styles/globals.scss';
import '@/styles/reset.scss';

export const metadata: Metadata = {
  title: 'Дом сомелье',
  description: 'Винный бутик Дом сомелье',
};

const myFont = localFont({
  src: './fonts/gilroyRegular.woff2',
  display: 'swap',
});

// const gilroyFont = localFont({
//   src: [
//     {
//       path: './fonts/gilroyRegular.woff2',
//       weight: '400',
//       style: 'normal',
//     },
//     {
//       path: './fonts/gilroyMedium.woff2',
//       weight: '500',
//       style: 'normal',
//     },
//   ],
// });

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
