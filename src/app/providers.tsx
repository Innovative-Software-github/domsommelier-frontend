'use client';

import { ReactNode, useRef } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import NextTopLoader from 'nextjs-toploader';

import { createStore } from '@/store';
import { IServerData, TAppStore } from '@/store/interfaces';

interface IProvidersProps {
  children: ReactNode;
  reduxPreloadedState: IServerData;
}

export function Providers({ children, reduxPreloadedState }: IProvidersProps) {
  const storeRef = useRef<TAppStore | null>(null);

  if (!storeRef.current) {
    // Создаем экземпляр хранилища при первом рендеринге
    storeRef.current = createStore(reduxPreloadedState);
  }

  return (
    <ReduxProvider store={storeRef.current}>
      <NextTopLoader color="#680A08" showSpinner={false} />
      {children}
    </ReduxProvider>
  );
}
