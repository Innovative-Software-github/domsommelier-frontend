import React from 'react';
import { ContentContainer } from '@/ui/ContentContainer/ContentContainer';
import cls from './HeaderMobile.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SearchInput } from '@/features/search/components/SearchInput/SearchInput';
import { Icon } from '../../../ui/Icon/Icon';
import { IconType } from '../../../ui/Icon/IconsMapping';
import { MobileMenu } from './MobileMenu/MobileMenu';
import { ROUTES, getSearchUrl } from '../../../constants/routes';

export const HeaderMobile: React.FC = () => {
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = React.useState(false);
  const [query, setQuery] = React.useState('');
  const router = useRouter();

  return (
    <header className={cls.header}>
      <ContentContainer className={cls.container}>
        <Link href={ROUTES.home} aria-label="На главную">
          <Image
            src="/mobileLogotype.png"
            alt="Логотип на мобильные устройства"
            width={72}
            height={72}
          />
        </Link>
        <SearchInput
          className={cls.input}
          value={query}
          onChange={setQuery}
          onSubmit={(text) => router.push(getSearchUrl(text))}
          theme="wineRed"
        />
        {/* На самых узких экранах поле не помещается — ведём на страницу поиска. */}
        <Link href={ROUTES.search} className={cls.searchLink} aria-label="Поиск по каталогу">
          <Icon type={IconType.Search_24} width={24} height={24} />
        </Link>

        <button
          type="button"
          className={cls.burgerMenuButton}
          onClick={() => setIsBurgerMenuOpen(true)}
        >
          <Icon type={IconType.Hamburger_24} width={24} height={24} />
        </button>
      </ContentContainer>
      <MobileMenu
        isOpen={isBurgerMenuOpen}
        onClose={() => setIsBurgerMenuOpen(false)}
      />
    </header>
  );
};
