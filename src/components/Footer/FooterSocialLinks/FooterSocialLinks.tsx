import { FOOTER_COPYRIGHT_TEXT } from '@/constants/copyright';
import cls from './FooterSocialLinks.module.scss';
import { socialLinksConstant } from '@/constants/contacts';
import Link from 'next/link';
import { ROUTES } from '@/constants/routes';

export const FooterSocialLinks: React.FC = () => {
  return (
    <div className={cls.container}>
      <div className={cls.socialLinksContainer}>
        <div className={cls.socialLinks}>
          {socialLinksConstant.map((link) => (
            <Link key={link.label} href={link.href} target="_blank">
              {link.label}
            </Link>
          ))}
        </div>
        <div className={cls.copyright}>{FOOTER_COPYRIGHT_TEXT}</div>
      </div>

      <div className={cls.rulesContainer}>
        <Link href={ROUTES.privacyPolicy}>{ROUTES.privacyPolicy}</Link>
      </div>
    </div>
  );
};
