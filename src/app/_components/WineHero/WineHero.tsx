import Image from 'next/image';
import { ContentContainer } from '../../../ui/ContentContainer/ContentContainer';
import cls from './WineHero.module.scss';
import React from 'react';

export const WineHero: React.FC = () => {
  return (
    <section>
      <ContentContainer className={cls.container}>
        <span className={cls.letter}>W</span>
        <div className={cls.wineImageContainer}>
          <Image
            src="/wineBottle.png"
            alt="photo of wine bottle"
            fill
            priority
            style={{ objectFit: 'contain' }}
          />
        </div>
        <span className={cls.letter}>N</span>
        <span className={cls.letter}>E</span>
      </ContentContainer>
    </section>
  );
};
