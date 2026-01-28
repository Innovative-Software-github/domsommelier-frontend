import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Forum } from 'next/font/google';

import { Providers } from '@/app/providers';

import '@/styles/globals.scss';
import '@/styles/reset.scss';
import clsx from 'clsx';
import { getFiltersConfig } from '../services/filters/serverRequest';
import { IServerData } from '../store/interfaces';
import { createBasketInitialState } from '../store/basket/utils';
import { getBasket } from '../services/basket/requests';
import { getCityInitialState } from '../services/city/serverRequest';

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

export const TEMP_CUSTOMER_ID = '3fa85f64-5717-4562-b3fc-2c963f66afa6';

// export const metadata: Metadata = {
//   title: 'Дом сомелье',
//   description: 'Винный бутик Дом сомелье',
// };

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [filtersConfig, basket, cityInitialState] = await Promise.all([
    getFiltersConfig(),
    getBasket(TEMP_CUSTOMER_ID),
    getCityInitialState(),
  ]);

  const reduxPreloadedState: IServerData = {
    filtersConfig: filtersConfig,
    basketReducer: createBasketInitialState(basket),
    city: cityInitialState,
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
