import React from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

import { Icon } from '@/ui/Icon/Icon';
import { IconType } from '@/ui/Icon/IconsMapping';
import { Popover } from '@/ui/Popover/Popover';
import { ROUTES } from '@/constants/routes';
import { isAuthenticatedSelector } from '@/store/auth/selectors';
import { ProfilePopoverAuth } from './ProfilePopoverAuth';
import { ProfilePopoverUser } from './ProfilePopoverUser';

import cls from './ProfileButton.module.scss';

export const ProfileButton: React.FC = () => {
  const router = useRouter();
  const isAuthenticated = useSelector(isAuthenticatedSelector);

  const handleClick = () => {
    if (isAuthenticated) {
      router.push(ROUTES.profile);
    }
  };

  return (
    <Popover placement="bottom-end">
      <Popover.Anchor>
        <button className={cls.button} onClick={handleClick} aria-label="Профиль">
          <Icon type={IconType.Profile_24} width={24} height={24} />
        </button>
      </Popover.Anchor>

      {isAuthenticated ? <ProfilePopoverUser /> : <ProfilePopoverAuth />}
    </Popover>
  );
};
