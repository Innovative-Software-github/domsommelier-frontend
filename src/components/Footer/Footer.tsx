import { TTheme } from '@/constants/theme';
import { ContentContainer } from '../../ui/ContentContainer/ContentContainer';

import cls from './Footer.module.scss';
import { FooterContent } from './FooterContent/FooterContent';
import { FooterSocialLinks } from './FooterSocialLinks/FooterSocialLinks';

export interface IFooterProps {
  theme?: TTheme;
}

export const Footer: React.FC<IFooterProps> = ({ theme = 'wineRed' }) => {
  return (
    <footer data-theme={theme} className={cls.wrapper}>
      <ContentContainer className={cls.contentContainer}>
        <FooterContent theme={theme} />
        <FooterSocialLinks />
      </ContentContainer>
    </footer>
  );
};
