'use client';

import React from 'react';

interface IAuthModalContext {
  isOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
}

const AuthModalContext = React.createContext<IAuthModalContext | null>(null);

export const useAuthModal = (): IAuthModalContext => {
  const context = React.useContext(AuthModalContext);

  if (!context) {
    throw new Error('useAuthModal должен использоваться внутри AuthModalProvider');
  }

  return context;
};

export const AuthModalProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const openAuthModal = React.useCallback(() => setIsOpen(true), []);
  const closeAuthModal = React.useCallback(() => setIsOpen(false), []);

  const value = React.useMemo(
    () => ({ isOpen, openAuthModal, closeAuthModal }),
    [isOpen, openAuthModal, closeAuthModal],
  );

  return (
    <AuthModalContext.Provider value={value}>
      {children}
    </AuthModalContext.Provider>
  );
};
