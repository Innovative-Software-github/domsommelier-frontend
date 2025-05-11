import Image from 'next/image';
import cls from './WineCard.module.scss';
import { formatWineDescription } from './utils';
import Link from 'next/link';

export interface IWineCardDescription {
  country: string;
  color: string;
  sweetness: string;
  displacement: string;
}

export interface IWineCardModel {
  id: string;
  imageLink: string;
  discountPrice: number;
  oldPrice: number;
  name: string;
  description: IWineCardDescription;
}

export interface IWineCard {
  wineOption: IWineCardModel;
}

export const WineCard: React.FC<IWineCard> = ({ wineOption }) => {
  const { id, imageLink, discountPrice, oldPrice, name, description } =
    wineOption;
  return (
    <Link href={`/${id}`} className={cls.container}>
      <Image
        className={cls.image}
        src={imageLink}
        width={305}
        height={370}
        alt="Wine card photo"
      />
      <div className={cls.prices}>
        <span className={cls.discountPrice}>{discountPrice} ₽</span>
        <span className={cls.oldPrice}>{oldPrice} ₽</span>
      </div>
      <div className={cls.name}>{name}</div>
      <div className={cls.description}>
        {formatWineDescription(description)}
      </div>
    </Link>
  );
};
