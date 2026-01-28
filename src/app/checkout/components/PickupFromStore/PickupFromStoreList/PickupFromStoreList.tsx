import { useSelector } from 'react-redux';
import { basketProductsSelector } from '../../../../../store/basket/selectors';

import cls from './PickupFromStoreList.module.scss';
import { PickupFromStoreItem } from '../PickupFromStoreItem/PickupFromStoreItem';

export const PickupFromStoreList = () => {
  const products = useSelector(basketProductsSelector);

  return (
    <div className={cls.productsList}>
      {products.map((item) => (
        <PickupFromStoreItem key={item.product.id} item={item} />
      ))}
    </div>
  );
}