import { TTheme } from '@/constants/theme';
import { ContentContainer } from '../../ui/ContentContainer/ContentContainer';

import cls from './Footer.module.scss';
import { FooterContent } from './FooterContent/FooterContent';
import { FooterSocialLinks } from './FooterSocialLinks/FooterSocialLinks';
import clsx from 'clsx';

export interface IFooterProps {
  theme?: TTheme;
  className?: string;
}

export const Footer: React.FC<IFooterProps> = ({ theme = 'wineRed', className }) => {
  return (
    <footer data-theme={theme} className={clsx(cls.wrapper, className)}>
      <ContentContainer className={cls.contentContainer}>
        <FooterContent theme={theme} />
        <FooterSocialLinks />
      </ContentContainer>
    </footer>
  );
};
