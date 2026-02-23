import React from 'react';

import { Button } from '@/ui/Button/Button';
import { Popover } from '@/ui/Popover/Popover';
import { useAuthModal } from '@/components/AuthModal/AuthModalContext';

import cls from './ProfileButton.module.scss';

export const ProfilePopoverAuth: React.FC = () => {
  const { openAuthModal } = useAuthModal();

  return (
    <Popover.Content>
      <span className={cls.popoverText}>Войти в личный кабинет</span>
      <Button variant="default" height="H-36" onClick={openAuthModal}>
        Войти
      </Button>
    </Popover.Content>
  );
};

