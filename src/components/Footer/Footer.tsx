import { ContentContainer } from '../../ui/ContentContainer/ContentContainer';

import cls from './Footer.module.scss';
import { FooterContent } from './FooterContent/FooterContent';
import { FooterSocialLinks } from './FooterSocialLinks/FooterSocialLinks';

export type TFooterTheme = 'wineRed' | 'white';

export interface IFooterProps {
  theme?: TFooterTheme;
}

export const Footer: React.FC<IFooterProps> = ({ theme = 'wineRed' }) => {
  return (
    <footer data-theme={theme} className={cls.wrapper}>
      <ContentContainer className={cls.contentContainer}>
        <FooterContent />
        <FooterSocialLinks />
      </ContentContainer>
    </footer>
  );
};
