
import { ContentContainer } from '../ContentContainer/ContentContainer';
import cls from './HeaderTitle.module.scss';

export interface IHeaderTitleProps {
  title: string;
}

export const HeaderTitle: React.FC<IHeaderTitleProps> = ({ title }) => {
  return (
    <ContentContainer>
      <h1 className={cls.title}>{title}</h1>
    </ContentContainer>
  );
};