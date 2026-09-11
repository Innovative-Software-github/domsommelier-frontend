import { useLayoutEffect } from 'react';

// Блокировка общая на все модалки. Раньше каждая запоминала overflow body на
// момент открытия и возвращала его при закрытии — при двух открытых сразу
// (каталог + поиск) вторая запоминала уже 'hidden', и если закрывались не в
// обратном порядке (Escape закрывает обе, каталог первым), body навсегда
// оставался с overflow: hidden. Теперь стили снимаются, только когда закрылась
// последняя модалка.
let lockCount = 0;
let savedOverflow = '';
let savedPaddingRight = '';

export const useBodyScrollLock = (isLocked: boolean) => {
  useLayoutEffect(() => {
    if (!isLocked) return;

    if (lockCount === 0) {
      const scrollBarWidth =
        window.innerWidth - document.documentElement.clientWidth;

      savedOverflow = document.body.style.overflow;
      savedPaddingRight = document.body.style.paddingRight;

      document.body.style.overflow = 'hidden';

      if (scrollBarWidth > 0) {
        document.body.style.paddingRight = `${scrollBarWidth}px`;
      }
    }

    lockCount += 1;

    return () => {
      lockCount -= 1;

      if (lockCount === 0) {
        document.body.style.overflow = savedOverflow;
        document.body.style.paddingRight = savedPaddingRight;
      }
    };
  }, [isLocked]);
};
