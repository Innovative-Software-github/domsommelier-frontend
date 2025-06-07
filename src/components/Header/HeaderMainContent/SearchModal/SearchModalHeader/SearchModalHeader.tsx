import * as React from 'react';

import { Input } from '../../../../../ui/Input/Input';
import { Icon } from '../../../../../ui/Icon/Icon';
import { IconType } from '../../../../../ui/Icon/IconsMapping';
import { Button } from '../../../../../ui/Button/Button';
import cls from './SearchModalHeader.module.scss';
import { useRouter } from 'next/navigation';
import { routes } from '../../../../../constants/routes';

export interface ISearchModalHeaderProps {
  onClose: () => void;
}

export const SearchModalHeader: React.FC<ISearchModalHeaderProps> = ({
  onClose,
}) => {
  const router = useRouter();

  return (
    <div className={cls.header}>
      <Input
        theme="gray"
        elPrefix={<Icon type={IconType.Search_24} width={24} height={24} />}
        placeholder="Поиск по каталогу"
        onPressEnter={(e) => {
          const text = e.currentTarget.value.trim();

          if (text) {
            router.push(`${routes.search.href}?q=${encodeURIComponent(text)}`);
          }
          onClose();
        }}
      />
      <Button
        className={cls.closeButton}
        variant="darkOutlined"
        height="H-42"
        onClick={onClose}
      >
        Закрыть
      </Button>
    </div>
  );
};
