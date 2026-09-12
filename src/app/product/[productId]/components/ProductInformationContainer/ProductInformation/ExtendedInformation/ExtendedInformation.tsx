import type { TProduct } from '@/services/products/interfaces/base';
import { extendedInformation } from './data';
import cls from './ExtendedInformation.module.scss';

export function ExtendedInformation({ product }: { product: TProduct }) {
  const { sections, ratings } = extendedInformation(product);
  if (!sections.length && !ratings.length) return null;
  return <div className={cls.container}>
    {ratings.length > 0 && <section className={cls.section} aria-label="Вкусовой профиль">
      <h2 className={cls.heading}>Вкусовой профиль</h2>
      <div className={cls.ratings}>{ratings.map((rating, index) => <div className={cls.rating} key={`${rating.label}-${index}`}>
        <span>{rating.label}</span>
        <meter className={cls.meter} min={0} max={5} value={rating.value} aria-label={`${rating.label}: ${rating.value} из 5`} />
        <span className={cls.score}>{rating.value.toLocaleString('ru-RU')} / 5</span>
      </div>)}</div>
    </section>}
    {sections.map(section => <section className={cls.section} key={section.title} aria-label={section.title}>
      <h2 className={cls.heading}>{section.title}</h2>
      <dl className={cls.list}>{section.rows.map((row, index) => <div className={cls.row} key={`${row.label}-${index}`}>
        <dt>{row.label}</dt><dd>{row.text}</dd>
      </div>)}</dl>
    </section>)}
  </div>;
}
