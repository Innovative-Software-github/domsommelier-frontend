import Image from 'next/image';
import Link from 'next/link';
import { IBasketItem } from '../../../../../services/basket/interfaces';
import { getProductUrl } from '../../../../../constants/routes';
import cls from './PickupFromStoreItem.module.scss';

interface IPickupFromStoreItemProps {
  item: IBasketItem;
}

export const PickupFromStoreItem: React.FC<IPickupFromStoreItemProps> = ({ item }) => {
  const { product, quantity } = item;
  const imageUrl = product.productPhoto[0]?.url || '/wineBottleCard.png';

  return (
    <Link href={getProductUrl(product.id)} target='_blank' className={cls.item}>
      <div className={cls.imageWrapper}>
        <Image
          src={imageUrl}
          alt={product.name}
          fill
          className={cls.image}
          sizes="124px"
        />
      </div>
      <p className={cls.quantity}>{quantity} шт</p>
    </Link>
  );
};

