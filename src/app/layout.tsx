import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Forum } from 'next/font/google';

import { Providers } from '@/app/providers';

import '@/styles/globals.scss';
import '@/styles/reset.scss';
import clsx from 'clsx';

const gilroy = localFont({
  src: [
    {
      path: './fonts/gilroy-regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/gilroy-medium.ttf',
      weight: '500',
      style: 'normal',
    },
  ],
});

const forum = Forum({
  weight: ['400'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
});

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
    <html lang="en" className={clsx(forum.className, gilroy.className)}>
      <body>
        <Providers reduxPreloadedState={reduxPreloadedState}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
