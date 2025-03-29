import { NewsSwiper } from './NewsSwiper/NewsSwiper';
import cls from './NewsSwiperSection.module.scss';

export const NewsSwiperSection: React.FC = () => {
  return (
    <section className={cls.container}>
      <div className={cls.title}>Новости</div>
      <NewsSwiper />
    </section>
  );
};
