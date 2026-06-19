import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '@/ui/Button/Button';
import { Popover } from '@/ui/Popover/Popover';
import { ROUTES } from '@/constants/routes';
import { ADMIN_PANEL_URL } from '@/constants/constants';
import { logoutAction } from '@/store/auth/actions';
import { isAdminSelector } from '@/store/auth/selectors';

export const ProfilePopoverUser: React.FC = () => {
  const dispatch = useDispatch();
  const isAdminUser = useSelector(isAdminSelector);

  const handleLogout = () => {
    dispatch(logoutAction());
  };

  const handleOpenAdmin = () => {
    window.open(ADMIN_PANEL_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <Popover.Content>
      <Button variant="default" height="H-36" href={ROUTES.profile}>
        Личный кабинет
      </Button>
      {isAdminUser && (
        <Button variant="outlined" height="H-36" onClick={handleOpenAdmin}>
          Админ-панель
        </Button>
      )}
      <Button variant="outlined" height="H-36" onClick={handleLogout}>
        Выйти
      </Button>
    </Popover.Content>
  );
};

