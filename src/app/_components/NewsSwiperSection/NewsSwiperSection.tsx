'use client';

import { useLatestNews } from './useLatestNews';
import { NewsSwiper } from './NewsSwiper/NewsSwiper';
import cls from './NewsSwiperSection.module.scss';

export const NewsSwiperSection = () => {
  const { news, loading } = useLatestNews(10);

  // Пустую или ещё загружающуюся секцию новостей не показываем.
  if (loading || news.length === 0) {
    return null;
  }

  return (
    <section className={cls.container}>
      <div className={cls.title}>Новости</div>
      <NewsSwiper items={news} />
    </section>
  );
};
