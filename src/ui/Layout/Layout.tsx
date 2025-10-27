import { Footer } from '@/components/Footer/Footer';
import { Header } from '@/components/Header/Header';
import { TTheme } from '../../constants/theme';
import cls from './Layout.module.scss';
import clsx from 'clsx';

export interface ILayoutProps extends React.PropsWithChildren {
  footerTheme?: TTheme;
  backgroundTheme?: 'white' | 'gray';
  showCatalogLinks?: boolean;
  containerClassName?: string;
  className?: string;
  footerClassName?: string;
}

export const Layout: React.FC<ILayoutProps> = ({
  footerTheme = 'white',
  backgroundTheme = 'white',
  showCatalogLinks,
  containerClassName,
  footerClassName,
  className,
  children,
}) => {
  return (
    <div className={clsx(cls.layout, containerClassName)}>
      <Header showCatalogLinks={showCatalogLinks} />
      <main data-bg-theme={backgroundTheme} className={clsx(cls.main, className)}>{children}</main>
      <Footer className={footerClassName} theme={footerTheme} />
    </div>
  );
};
