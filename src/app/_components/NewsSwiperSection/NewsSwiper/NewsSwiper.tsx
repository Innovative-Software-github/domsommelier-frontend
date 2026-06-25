'use client';

import * as React from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Icon } from '../../../../ui/Icon/Icon';
import { IconType } from '../../../../ui/Icon/IconsMapping';
import { INews } from '@/services/news/interfaces';
import cls from './NewsSwiper.module.scss';

/** Плейсхолдер, если у новости нет обложки или она не загрузилась. */
const COVER_FALLBACK = '/eventImage.png';

/** Относительный coverUrl (`/api/v1/news/{id}/cover`) проксируется через /api-back на бэкенд. */
function resolveCoverSrc(coverUrl: string | null): string {
  if (!coverUrl) {
    return COVER_FALLBACK;
  }
  return coverUrl.startsWith('http') ? coverUrl : `/api-back${coverUrl}`;
}

export interface NewsSwiperProps {
  items: INews[];
}

const NewsSlideImage: React.FC<{ news: INews; active: boolean }> = ({ news, active }) => {
  const [src, setSrc] = React.useState(resolveCoverSrc(news.coverUrl));

  return (
    <Image
      className={clsx(cls.image, { [cls.activeImage]: active })}
      src={src}
      alt={news.title}
      width={845}
      height={585}
      priority
      onError={() => setSrc(COVER_FALLBACK)}
    />
  );
};

export const NewsSwiper: React.FC<NewsSwiperProps> = ({ items }) => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const swiperRef = React.useRef<SwiperRef>(null);

  return (
    <div className={cls.sliderContainer}>
      <Swiper
        ref={swiperRef}
        slidesPerView="auto"
        centeredSlides
        loop={items.length > 2}
        speed={650}
        spaceBetween={24}
        className={cls.customSwiper}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
      >
        {items.map((news, index) => (
          <SwiperSlide key={news.id} className={cls.customSwiperSlide}>
            <div className={cls.imageContainer}>
              <NewsSlideImage news={news} active={index === activeIndex} />
            </div>
            <div
              className={clsx(cls.slideText, {
                [cls.activeText]: index === activeIndex,
              })}
            >
              <div>
                <div className={cls.text}>{news.title}</div>
                {news.description && <div className={cls.description}>{news.description}</div>}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className={cls.navigationWrapper}>
        <button
          className={cls.swiperButtonPrev}
          onClick={() => swiperRef.current?.swiper.slidePrev()}
        >
          <Icon className={cls.buttonPrevIconArrow} type={IconType.ArrowDown_24} />
        </button>
        <button
          className={cls.swiperButtonNext}
          onClick={() => swiperRef.current?.swiper.slideNext()}
        >
          <Icon className={cls.buttonNextIconArrow} type={IconType.ArrowDown_24} />
        </button>
      </div>
    </div>
  );
};
