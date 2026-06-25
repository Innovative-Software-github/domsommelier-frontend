import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Forum } from 'next/font/google';
import { Toaster } from 'sonner';

import { cookies } from 'next/headers';

import { Providers } from '@/app/providers';
import { CUSTOMER_ID_COOKIE } from '@/services/auth/constants';

import '@/styles/globals.scss';
import '@/styles/reset.scss';
import clsx from 'clsx';
import { getFiltersConfig } from '../services/filters/serverRequest';
import { IServerData } from '../store/interfaces';
import { createBasketInitialState } from '../store/basket/utils';
import { getBasket } from '../services/basket/requests';
import { createSavedInitialState } from '../store/saved/utils';
import { getSaved } from '../services/saved/requests';
import { getCityInitialState } from '../services/city/serverRequest';
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/constants/site';

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

const DEFAULT_TITLE = `${SITE_NAME} — винный бутик: вино, шампанское, крепкий алкоголь`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    locale: 'ru_RU',
    url: SITE_URL,
    title: DEFAULT_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: DEFAULT_TITLE,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const customerId = cookieStore.get(CUSTOMER_ID_COOKIE)?.value;

  const [filtersConfig, basket, saved, cityInitialState] = await Promise.all([
    getFiltersConfig(),
    getBasket(customerId),
    getSaved(customerId),
    getCityInitialState(),
  ]);

  const reduxPreloadedState: IServerData = {
    filtersConfig: filtersConfig,
    basketReducer: createBasketInitialState(basket),
    savedReducer: createSavedInitialState(saved),
    city: cityInitialState,
  };

  return (
    <html
      lang="ru"
      className={clsx(saol.className, forum.className, gilroy.className)}
    >
      <body>
        <Providers reduxPreloadedState={reduxPreloadedState}>
          {children}
        </Providers>
        <Toaster position="top-right" richColors closeButton />
      </body>
    </html>
  );
}
