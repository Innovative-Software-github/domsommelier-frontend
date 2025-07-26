import { Footer } from '@/components/Footer/Footer';
import { Header } from '@/components/Header/Header';
import { TTheme } from '../../constants/theme';
import cls from './Layout.module.scss';
import clsx from 'clsx';

export interface ILayoutProps extends React.PropsWithChildren {
  footerTheme?: TTheme;
  showCatalogLinks?: boolean;
  containerClassName?: string;
  className?: string;
  footerClassName?: string;
}

export const Layout: React.FC<ILayoutProps> = ({
  footerTheme = 'white',
  showCatalogLinks,
  containerClassName,
  footerClassName,
  className,
  children,
}) => {
  return (
    <div className={clsx(cls.layout, containerClassName)}>
      <Header showCatalogLinks={showCatalogLinks} />
      <main className={clsx(cls.main, className)}>{children}</main>
      <Footer className={footerClassName} theme={footerTheme} />
    </div>
  );
};
