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

const saol = localFont({
  src: [
    {
      path: './fonts/SaolDisplay-Regular.ttf',
      weight: '400',
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
  const reduxPreloadedState = {
    filterConfig: {
      wine: {
        name: 'Шампанское и игристое',
        price: [
          {
            id: 1,
            price: 'До 1000 ₽ ',
          },
          {
            id: 2,
            price: '1 000 ₽ - 3 000 ₽',
          },
          {
            id: 3,
            price: '3 000 ₽ - 6 000 ₽',
          },
          {
            id: 4,
            price: '6 000 ₽ - 10 000 ₽',
          },
        ],
      },
    },
  };

  return (
    <html
      lang="en"
      className={clsx(saol.className, forum.className, gilroy.className)}
    >
      <body>
        <Providers reduxPreloadedState={reduxPreloadedState}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
