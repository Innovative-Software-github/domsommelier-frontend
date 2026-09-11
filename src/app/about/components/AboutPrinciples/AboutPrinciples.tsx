import { ContentContainer } from '@/ui/ContentContainer/ContentContainer';
import { ROUTES } from '@/constants/routes';
import { CategoryLink } from '@/app/_components/CategoryLinks/CategoryLink/CategoryLink';
import cls from './AboutPrinciples.module.scss';

const links = [
  { label: 'Каталог вин и напитков', href: ROUTES.catalog },
  { label: 'Дегустации и винные казино', href: ROUTES.events },
  { label: 'Частные мероприятия', href: ROUTES.privateEvents },
] as const;

export const AboutPrinciples: React.FC = () => {
  return (
    <ContentContainer className={cls.container}>
      <h2 className={cls.title}>Чем мы занимаемся</h2>
      <div className={cls.links}>
        {links.map((link) => (
          <CategoryLink key={link.href} label={link.label} href={link.href} />
        ))}
      </div>
    </ContentContainer>
  );
};
