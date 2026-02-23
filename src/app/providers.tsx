'use client';

import { ReactNode, useRef } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import NextTopLoader from 'nextjs-toploader';

import { createStore } from '@/store';
import { IServerData, TAppStore } from '@/store/interfaces';
import { AuthModalProvider } from '@/components/AuthModal/AuthModalContext';
import { AuthModal } from '@/components/AuthModal/AuthModal';
import { useRestoreAuthSession } from '@/hooks/useRestoreAuthSession';

interface IProvidersProps {
  children: ReactNode;
  reduxPreloadedState: IServerData;
}

function AuthSessionRestorer({ children }: { children: ReactNode }) {
  useRestoreAuthSession();
  return <>{children}</>;
}

export function Providers({ children, reduxPreloadedState }: IProvidersProps) {
  const storeRef = useRef<TAppStore | null>(null);

  if (!storeRef.current) {
    // Создаем экземпляр хранилища при первом рендеринге
    storeRef.current = createStore(reduxPreloadedState);
  }

  return (
    <ReduxProvider store={storeRef.current}>
      <AuthSessionRestorer>
        <AuthModalProvider>
          <NextTopLoader color="#680A08" showSpinner={false} />
          {children}
          <AuthModal />
        </AuthModalProvider>
      </AuthSessionRestorer>
    </ReduxProvider>
  );
}
