import { ContentContainer } from '../../ui/ContentContainer/ContentContainer';

import cls from './Footer.module.scss';
import { FooterContent } from './FooterContent/FooterContent';
import { FooterSocialLinks } from './FooterSocialLinks/FooterSocialLinks';

export type TFooterTheme = 'vineColor' | 'white';

export interface IFooterProps {
  theme?: TFooterTheme;
}

export const Footer: React.FC<IFooterProps> = ({ theme = 'vineColor' }) => {
  return (
    <div data-theme={theme} className={cls.wrapper}>
      <ContentContainer className={cls.contentContainer}>
        <FooterContent />
        <FooterSocialLinks />
      </ContentContainer>
    </div>
  );
};
