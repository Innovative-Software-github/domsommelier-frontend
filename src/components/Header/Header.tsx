'use client';

import React from 'react';
import clsx from 'clsx';
import { ContentContainer } from '@/ui/ContentContainer/ContentContainer';
import { HeaderCatalogLinks } from '@/components/Header/HeaderCatalogLinks/HeaderCatalogLinks';
import { HeaderMainContent } from '@/components/Header/HeaderMainContent/HeaderMainContent';
import { HeaderTopContent } from '@/components/Header/HeaderTopContent/HeaderTopContent';
import cls from './Header.module.scss';
import { HeaderMobile } from './HeaderMobile/HeaderMobile';

export interface IHeaderProps {
  showCatalogLinks?: boolean;
}

// После какого сдвига скролла показывать тень под прилипшей шапкой — небольшой
// порог, чтобы тень не мигала от случайного дребезга скролла на 1-2px.
const SCROLL_SHADOW_THRESHOLD = 8;

// Строку с категориями не прячем, пока не отскроллили от самого верха —
// иначе она пропадала бы уже на первых пикселях скролла.
const CATALOG_LINKS_TOP_OFFSET = 80;

// Направление скролла считаем по разнице с предыдущей отметкой, а не по
// любому шевелению на пару px — инерционный скролл (трекпад, мобильные тачи)
// в конце жеста слегка «отскакивает» назад, и маленький порог принял бы это
// затухание за осознанный скролл вверх.
const SCROLL_DELTA_THRESHOLD = 24;

// Схлопывание/появление блока категорий само по себе меняет высоту шапки —
// в части браузеров это на кадр-другой слегка сдвигает scrollY (компенсация
// раскладки у самого верха страницы), даже при overflow-anchor: none. Без
// паузы этот сдвиг читался бы как новый жест скролла и разворачивал бы
// анимацию обратно — а та снова сдвигала бы scrollY, и так по кругу
// (зацикливание при резком скролле). Поэтому на время анимации + запас
// игнорируем скролл-события для этого блока.
const CATALOG_LINKS_ANIMATION_COOLDOWN_MS = 450;

export const Header: React.FC<IHeaderProps> = ({ showCatalogLinks = true }) => {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isCatalogLinksVisible, setIsCatalogLinksVisible] = React.useState(true);
  const lastScrollYRef = React.useRef(0);
  const isCatalogLinksVisibleRef = React.useRef(true);
  const cooldownUntilRef = React.useRef(0);

  React.useEffect(() => {
    lastScrollYRef.current = window.scrollY;

    const applyCatalogLinksVisibility = (visible: boolean) => {
      if (isCatalogLinksVisibleRef.current === visible) {
        return;
      }
      isCatalogLinksVisibleRef.current = visible;
      setIsCatalogLinksVisible(visible);
      cooldownUntilRef.current = Date.now() + CATALOG_LINKS_ANIMATION_COOLDOWN_MS;
    };

    const updateScrollState = () => {
      const currentScrollY = window.scrollY;

      setIsScrolled(currentScrollY > SCROLL_SHADOW_THRESHOLD);

      if (Date.now() < cooldownUntilRef.current) {
        // lastScrollYRef намеренно не трогаем: как только пауза закончится,
        // разница посчитается от точки ДО срабатывания анимации, а не от
        // шумного промежуточного кадра во время неё.
        return;
      }

      const delta = currentScrollY - lastScrollYRef.current;

      // Точку отсчёта двигаем только когда порог реально пройден — иначе
      // скролл мелкими шагами (колесо мыши, инерция) никогда бы не накопил
      // нужную разницу: каждый шаг сравнивался бы с предыдущим же шагом.
      if (currentScrollY <= CATALOG_LINKS_TOP_OFFSET) {
        applyCatalogLinksVisibility(true);
        lastScrollYRef.current = currentScrollY;
      } else if (delta > SCROLL_DELTA_THRESHOLD) {
        applyCatalogLinksVisibility(false); // скроллим вниз
        lastScrollYRef.current = currentScrollY;
      } else if (delta < -SCROLL_DELTA_THRESHOLD) {
        applyCatalogLinksVisibility(true); // скроллим вверх
        lastScrollYRef.current = currentScrollY;
      }
    };

    updateScrollState();
    window.addEventListener('scroll', updateScrollState, { passive: true });
    return () => window.removeEventListener('scroll', updateScrollState);
  }, []);

  return (
    <header className={clsx(cls.header, { [cls.scrolled]: isScrolled })}>
      <ContentContainer>
        <div className={cls.desktopOnly}>
          <HeaderTopContent />
          <HeaderMainContent />
          {showCatalogLinks && (
            <div
              className={clsx(cls.catalogLinksWrapper, {
                [cls.catalogLinksHidden]: !isCatalogLinksVisible,
              })}
            >
              <HeaderCatalogLinks />
            </div>
          )}
        </div>

        <div className={cls.mobileOnly}>
          <HeaderMobile />
        </div>
      </ContentContainer>
    </header>
  );
};
