import React from 'react';
import { useDispatch } from 'react-redux';

import { Button } from '@/ui/Button/Button';
import { Popover } from '@/ui/Popover/Popover';
import { ROUTES } from '@/constants/routes';
import { logoutAction } from '@/store/auth/actions';

export const ProfilePopoverUser: React.FC = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutAction());
  };

  return (
    <Popover.Content>
      <Button variant="default" height="H-36" href={ROUTES.profile}>
        Личный кабинет
      </Button>
      <Button variant="outlined" height="H-36" onClick={handleLogout}>
        Выйти
      </Button>
    </Popover.Content>
  );
};

