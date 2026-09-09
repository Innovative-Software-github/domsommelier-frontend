'use client';

import * as React from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { Swiper, SwiperSlide, SwiperRef } from 'swiper/react';
import 'swiper/css';

import { Icon } from '../../../../../../ui/Icon/Icon';
import { IconType } from '../../../../../../ui/Icon/IconsMapping';
import { TProduct } from '../../../../../../services/products/interfaces/base';

import cls from './ProductPhotoGallery.module.scss';

export interface IProductPhotoGalleryProps {
  productPhoto: TProduct['productPhoto'];
}

const FALLBACK_PHOTO_URL = '/wineBottle.png';
const IMAGE_SIZES = '(max-width: 600px) 100vw, (max-width: 1200px) 60vw, 470px';

export const ProductPhotoGallery: React.FC<IProductPhotoGalleryProps> = ({ productPhoto }) => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const swiperRef = React.useRef<SwiperRef>(null);

  const hasPhotos = productPhoto.length > 0;
  const hasMultiplePhotos = productPhoto.length > 1;

  // Нет фото вообще — просто фолбэк-картинка, без карусели (карусель из
  // одного слайда не имеет смысла и раньше сюда никогда не попадали).
  if (!hasPhotos) {
    return (
      <div className={cls.container}>
        <div className={cls.mainArea}>
          <div className={cls.responsiveImageWrapper}>
            <Image
              className={cls.productImage}
              src={FALLBACK_PHOTO_URL}
              alt="Фотография продукта"
              fill
              sizes={IMAGE_SIZES}
              style={{ objectFit: 'contain' }}
              priority
            />
          </div>
        </div>
      </div>
    );
  }

  const goToSlide = (index: number) => {
    swiperRef.current?.swiper.slideTo(index);
  };

  return (
    <div className={cls.container}>
      <div className={cls.mainArea}>
        <Swiper
          ref={swiperRef}
          slidesPerView={1}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          className={cls.mainSwiper}
        >
          {productPhoto.map((photo, index) => (
            <SwiperSlide key={photo.id}>
              <div className={cls.responsiveImageWrapper}>
                <Image
                  className={cls.productImage}
                  src={photo.url || FALLBACK_PHOTO_URL}
                  alt={photo.description || `Фотография продукта ${index + 1}`}
                  fill
                  sizes={IMAGE_SIZES}
                  style={{ objectFit: 'contain' }}
                  priority={index === 0}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {hasMultiplePhotos && (
          <>
            <button
              type="button"
              aria-label="Предыдущее фото"
              className={clsx(cls.navButton, cls.navButtonPrev)}
              onClick={() => swiperRef.current?.swiper.slidePrev()}
            >
              <Icon type={IconType.ArrowRight_24} className={cls.navIconPrev} />
            </button>
            <button
              type="button"
              aria-label="Следующее фото"
              className={clsx(cls.navButton, cls.navButtonNext)}
              onClick={() => swiperRef.current?.swiper.slideNext()}
            >
              <Icon type={IconType.ArrowRight_24} />
            </button>
          </>
        )}
      </div>

      {hasMultiplePhotos && (
        <div className={cls.thumbnails}>
          {productPhoto.map((photo, index) => (
            <button
              key={photo.id}
              type="button"
              aria-label={`Показать фото ${index + 1}`}
              aria-current={index === activeIndex}
              className={clsx(cls.thumbnail, {
                [cls.thumbnailActive]: index === activeIndex,
              })}
              onClick={() => goToSlide(index)}
            >
              <Image
                src={photo.url || FALLBACK_PHOTO_URL}
                alt=""
                fill
                sizes="64px"
                style={{ objectFit: 'contain' }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
