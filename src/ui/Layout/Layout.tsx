import { Footer } from '@/components/Footer/Footer';
import { Header } from '@/components/Header/Header';

import cls from './Layout.module.scss';

export interface ILayoutProps extends React.PropsWithChildren {}

export const Layout: React.FC<ILayoutProps> = ({ children }) => {
  return (
    <div className={cls.layout}>
      <Header />
      <main className={cls.main}>{children}</main>
      <Footer theme="white" />
    </div>
  );
};
