'use client';

import * as React from 'react';
import Image from 'next/image';
import cls from './NewsSwiper.module.scss';
import { Swiper, SwiperClass, SwiperRef, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Icon } from '../../../../ui/Icon/Icon';
import { IconType } from '../../../../ui/Icon/IconsMapping';
import clsx from 'clsx';

export const NewsSwiper: React.FC = () => {
  const [activeIndex, setActiveIndex] = React.useState<number | undefined>(0);
  const swiperRef = React.useRef<SwiperRef>(null);

  const mockImages = [
    {
      id: 1,
      src: 'https://s3-alpha-sig.figma.com/img/634c/8b50/d7713c005d22626faaff9d1ad42626b3?Expires=1747612800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=pQtlo24zuagSBRrRMmenBwM5~dKFejh2giYU2vjeiSEYalShV6zp3BdHJGkMIVQ4OP6Cy62KA2zeKxbGvKGWFDzC4l3nE3bLgsqbcqPokO6bZIj1hpNqK7AEmEvd2jJcIMgvxZV0DyhGoUP3oS5K9B2NzIxbSmsFMZgnCv9N2ppAbEYm0XVM7KApVKbclT4sO5-bQYwKRx7vc9hSLFtdzh1uksNcSIw6xn2BEpIYgh~yvYPVoJ7XbhDTozUpyRMihSr5RPzf9wBKurSLRUdK-uijpQ5dhGlvPxJN6N5q2dg~IqGlZw6n0zcVtkBZn8B-k-9GcjEd8ckk-0Oq-5vwJA__',
      text: 'Дегустация Wineгрет1',
      description:
        'Вас ждёт невероятный сет из 𝟕 образцов от изысканного игристого до насыщенного энергией солнца красного. ',
    },
    {
      id: 2,
      src: 'https://s3-alpha-sig.figma.com/img/634c/8b50/d7713c005d22626faaff9d1ad42626b3?Expires=1747612800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=pQtlo24zuagSBRrRMmenBwM5~dKFejh2giYU2vjeiSEYalShV6zp3BdHJGkMIVQ4OP6Cy62KA2zeKxbGvKGWFDzC4l3nE3bLgsqbcqPokO6bZIj1hpNqK7AEmEvd2jJcIMgvxZV0DyhGoUP3oS5K9B2NzIxbSmsFMZgnCv9N2ppAbEYm0XVM7KApVKbclT4sO5-bQYwKRx7vc9hSLFtdzh1uksNcSIw6xn2BEpIYgh~yvYPVoJ7XbhDTozUpyRMihSr5RPzf9wBKurSLRUdK-uijpQ5dhGlvPxJN6N5q2dg~IqGlZw6n0zcVtkBZn8B-k-9GcjEd8ckk-0Oq-5vwJA__',
      text: 'Дегустация Wineгрет2',
      description:
        'Вас ждёт невероятный сет из 𝟕 образцов от изысканного игристого до насыщенного энергией солнца красного. ',
    },
    {
      id: 3,
      src: 'https://s3-alpha-sig.figma.com/img/634c/8b50/d7713c005d22626faaff9d1ad42626b3?Expires=1747612800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=pQtlo24zuagSBRrRMmenBwM5~dKFejh2giYU2vjeiSEYalShV6zp3BdHJGkMIVQ4OP6Cy62KA2zeKxbGvKGWFDzC4l3nE3bLgsqbcqPokO6bZIj1hpNqK7AEmEvd2jJcIMgvxZV0DyhGoUP3oS5K9B2NzIxbSmsFMZgnCv9N2ppAbEYm0XVM7KApVKbclT4sO5-bQYwKRx7vc9hSLFtdzh1uksNcSIw6xn2BEpIYgh~yvYPVoJ7XbhDTozUpyRMihSr5RPzf9wBKurSLRUdK-uijpQ5dhGlvPxJN6N5q2dg~IqGlZw6n0zcVtkBZn8B-k-9GcjEd8ckk-0Oq-5vwJA__',
      text: 'Дегустация Wineгрет3',
      description:
        'Вас ждёт невероятный сет из 𝟕 образцов от изысканного игристого до насыщенного энергией солнца красного. ',
    },
    {
      id: 4,
      src: 'https://s3-alpha-sig.figma.com/img/634c/8b50/d7713c005d22626faaff9d1ad42626b3?Expires=1747612800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=pQtlo24zuagSBRrRMmenBwM5~dKFejh2giYU2vjeiSEYalShV6zp3BdHJGkMIVQ4OP6Cy62KA2zeKxbGvKGWFDzC4l3nE3bLgsqbcqPokO6bZIj1hpNqK7AEmEvd2jJcIMgvxZV0DyhGoUP3oS5K9B2NzIxbSmsFMZgnCv9N2ppAbEYm0XVM7KApVKbclT4sO5-bQYwKRx7vc9hSLFtdzh1uksNcSIw6xn2BEpIYgh~yvYPVoJ7XbhDTozUpyRMihSr5RPzf9wBKurSLRUdK-uijpQ5dhGlvPxJN6N5q2dg~IqGlZw6n0zcVtkBZn8B-k-9GcjEd8ckk-0Oq-5vwJA__',
      text: 'Дегустация Wineгрет4',
      description:
        'Вас ждёт невероятный сет из 𝟕 образцов от изысканного игристого до насыщенного энергией солнца красного. ',
    },
    {
      id: 5,
      src: 'https://s3-alpha-sig.figma.com/img/634c/8b50/d7713c005d22626faaff9d1ad42626b3?Expires=1743984000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Z6tmXBAERFiSM9HiHXiHMiNJ9ByNIu2qicSgApG1l2wkgADgGfAItR6ouRZUge4b8Kj-834uIBkX6LHgg5~Uflss09mDt8EwQ-f18XtOfvex5DuwzrAMuSKj-T42XAPRKSuu-y4ym3V7BxHZqNH83y7u~kGX6T5C0F6HoYUvABGcK7eidLe49-sZG0PvG8aNwle12xX2GgOT5VRy1aAGWSQlWW4p3lAaE9-dEkVTzaUd2DWUfCF~9IJ8ZpVlMsRksbiJotdoS9poaBI4Rl2QK4mY3N99nERf0puISb3qczLp4nGn~AqfjF33OEAECPmBieG4uLacqCSYgAqnU7Kkhw__',
      text: 'Дегустация Wineгрет6',
      description:
        'Вас ждёт невероятный сет из 𝟕 образцов от изысканного игристого до насыщенного энергией солнца красного. ',
    },
    {
      id: 6,
      src: 'https://s3-alpha-sig.figma.com/img/634c/8b50/d7713c005d22626faaff9d1ad42626b3?Expires=1747612800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=pQtlo24zuagSBRrRMmenBwM5~dKFejh2giYU2vjeiSEYalShV6zp3BdHJGkMIVQ4OP6Cy62KA2zeKxbGvKGWFDzC4l3nE3bLgsqbcqPokO6bZIj1hpNqK7AEmEvd2jJcIMgvxZV0DyhGoUP3oS5K9B2NzIxbSmsFMZgnCv9N2ppAbEYm0XVM7KApVKbclT4sO5-bQYwKRx7vc9hSLFtdzh1uksNcSIw6xn2BEpIYgh~yvYPVoJ7XbhDTozUpyRMihSr5RPzf9wBKurSLRUdK-uijpQ5dhGlvPxJN6N5q2dg~IqGlZw6n0zcVtkBZn8B-k-9GcjEd8ckk-0Oq-5vwJA__',
      text: 'Дегустация Wineгрет6',
      description:
        'Вас ждёт невероятный сет из 𝟕 образцов от изысканного игристого до насыщенного энергией солнца красного. ',
    },
  ];

  return (
    <div className={cls.sliderContainer}>
      <Swiper
        ref={swiperRef}
        slidesPerView="auto"
        centeredSlides
        loop
        speed={650}
        spaceBetween={24}
        className={cls.customSwiper}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
      >
        {mockImages.map((image, index) => {
          return (
            <SwiperSlide key={image.id} className={cls.customSwiperSlide}>
              <div className={cls.imageContainer}>
                <Image
                  className={clsx(cls.image, {
                    [cls.activeImage]: index === activeIndex,
                  })}
                  src={image.src}
                  alt="Фото новости"
                  width={845}
                  height={585}
                  priority
                />
              </div>
              <div
                className={clsx(cls.slideText, {
                  [cls.activeText]: index === activeIndex,
                })}
              >
                <div>
                  <div className={cls.text}>{image.text}</div>
                  <div className={cls.description}>{image.description}</div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      <div className={cls.navigationWrapper}>
        <button
          className={cls.swiperButtonPrev}
          onClick={() => swiperRef.current?.swiper.slidePrev()}
        >
          <Icon
            className={cls.buttonPrevIconArrow}
            type={IconType.ArrowDown_24}
          />
        </button>
        <button
          className={cls.swiperButtonNext}
          onClick={() => swiperRef.current?.swiper.slideNext()}
        >
          <Icon
            className={cls.buttonNextIconArrow}
            type={IconType.ArrowDown_24}
          />
        </button>
      </div>
    </div>
  );
};
