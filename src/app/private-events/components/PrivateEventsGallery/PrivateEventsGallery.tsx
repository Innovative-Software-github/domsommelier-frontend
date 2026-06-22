import Image from 'next/image';

import { ContentContainer } from '@/ui/ContentContainer/ContentContainer';

import { GALLERY_IMAGES } from '../../constants';
import cls from './PrivateEventsGallery.module.scss';

export const PrivateEventsGallery: React.FC = () => {
  return (
    <section className={cls.section}>
      <h2 className={cls.heading}>Фотогалерея</h2>

      <ContentContainer className={cls.container}>
        <div className={cls.big}>
          <Image
            src="/private-events/gallery-big.png"
            alt="Фотогалерея мероприятий"
            fill
            sizes="1280px"
          />
        </div>

        <div className={cls.row}>
          {GALLERY_IMAGES.map((src, index) => (
            <div key={index} className={cls.cell}>
              <Image
                src={src}
                alt={`Фото мероприятия ${index + 1}`}
                fill
                sizes="(max-width: 767px) 50vw, 250px"
              />
            </div>
          ))}
        </div>
      </ContentContainer>
    </section>
  );
};
