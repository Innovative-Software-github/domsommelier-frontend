'use client';

import React from 'react';
import { IBasketItem } from '@/services/basket/interfaces';

interface ICartAddedPopupContext {
  addedItem: IBasketItem | null;
  isVisible: boolean;
  showAddedProduct: (item: IBasketItem) => void;
  hideAddedProduct: () => void;
}

const CartAddedPopupContext = React.createContext<ICartAddedPopupContext | null>(null);

/** Сколько попап виден на экране, прежде чем спрятаться сам. */
const HIDE_DELAY_MS = 4000;

export const useCartAddedPopup = (): ICartAddedPopupContext => {
  const context = React.useContext(CartAddedPopupContext);

  if (!context) {
    throw new Error('useCartAddedPopup должен использоваться внутри CartAddedPopupProvider');
  }

  return context;
};

export const CartAddedPopupProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [addedItem, setAddedItem] = React.useState<IBasketItem | null>(null);
  const [isVisible, setIsVisible] = React.useState(false);
  const hideTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const hideAddedProduct = React.useCallback(() => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
    setIsVisible(false);
  }, []);

  const showAddedProduct = React.useCallback((item: IBasketItem) => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }

    // Пересоздаём таймер при каждом добавлении — если товары добавляют
    // один за другим, попап не должен схлопнуться посреди чтения.
    setAddedItem(item);
    setIsVisible(true);

    hideTimeoutRef.current = setTimeout(() => {
      setIsVisible(false);
      hideTimeoutRef.current = null;
    }, HIDE_DELAY_MS);
  }, []);

  React.useEffect(() => {
    return () => {
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  }, []);

  const value = React.useMemo(
    () => ({ addedItem, isVisible, showAddedProduct, hideAddedProduct }),
    [addedItem, isVisible, showAddedProduct, hideAddedProduct],
  );

  return (
    <CartAddedPopupContext.Provider value={value}>
      {children}
    </CartAddedPopupContext.Provider>
  );
};
