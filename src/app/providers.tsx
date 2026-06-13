'use client';

import { ReactNode, useEffect, useRef } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import NextTopLoader from 'nextjs-toploader';

import { createStore } from '@/store';
import { IServerData, TAppStore } from '@/store/interfaces';
import { AuthModalProvider } from '@/components/AuthModal/AuthModalContext';
import { AuthModal } from '@/components/AuthModal/AuthModal';
import { useRestoreAuthSession } from '@/hooks/useRestoreAuthSession';
import { useSyncCartOnAuth } from '@/hooks/useSyncCartOnAuth';
import { logoutAction } from '@/store/auth/actions';
import { ROUTES } from '@/constants/routes';

interface IProvidersProps {
  children: ReactNode;
  reduxPreloadedState: IServerData;
}

function AuthSessionRestorer({ children }: { children: ReactNode }) {
  const dispatch = useDispatch();
  const router = useRouter();

  useRestoreAuthSession();
  useSyncCartOnAuth();

  useEffect(() => {
    const handler = () => {
      dispatch(logoutAction());
      router.replace(ROUTES.home);
    };

    window.addEventListener('auth:session-expired', handler);

    return () => window.removeEventListener('auth:session-expired', handler);
  }, [dispatch, router]);

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
