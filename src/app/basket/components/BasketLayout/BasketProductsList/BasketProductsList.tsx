'use client';

import { useSelector } from "react-redux";
import { basketProductsSelector } from "../../../../../store/basket/selectors";
import { ProductCardRow } from "../../../../../ui/ProductCardRow/ProductCardRow";
import { useBasket } from "../../../../../hooks/basket/useBasket";
import cls from './BasketProductsList.module.scss';

export interface IBasketProductsListProps {}

export const BasketProductsList: React.FC<IBasketProductsListProps> = () => {
  const products = useSelector(basketProductsSelector);
  const { updateQuantity, removeFromBasket } = useBasket();

  const handleUpdateQuantity = async (productId: string, quantity: number) => {
    await updateQuantity(productId, quantity);
  };

  if (products.length === 0) {
    return <div className={cls.productsList}>Корзина пуста</div>;
  }

  return (
    <div className={cls.productsList}>
      {products.map((product) => (
        <ProductCardRow
          key={product.product.id}
          option={product.product}
          isInBasket={true}
          currentQuantity={product.quantity}
          onUpdateQuantity={(quantity) => handleUpdateQuantity(product.product.id, quantity)}
          onRemoveFromBasket={() => removeFromBasket(product.product.id)}
        />
      ))}
    </div>
  );
};