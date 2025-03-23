import { ContentContainer } from '../../../ui/ContentContainer/ContentContainer';
import { CategoryLink } from './CategoryLink/CategoryLink';
import cls from './CategoryLinks.module.scss';
import { categoryLinksList } from './utils';

export const CategoryLinks: React.FC = () => {
  return (
    <ContentContainer>
      <section className={cls.container}>
        <div className={cls.title}>Категории товаров</div>
        <div className={cls.categoryLinksList}>
          {categoryLinksList.map(({ label, href }) => (
            <CategoryLink key={label} label={label} href={href} />
          ))}
        </div>
      </section>
    </ContentContainer>
  );
};
