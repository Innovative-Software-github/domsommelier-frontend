import { Button } from '../../../../../ui/Button/Button';
import cls from './ProductCartButton.module.scss';

export interface IProductCartButtonProps {

}

export const ProductCartButton: React.FC<IProductCartButtonProps> = () => {
  return (
    <div className={cls.container}>
      <Button className={cls.buyButton} onClick={() => alert('Пашол нахуй')}>
        <p>В корзину</p>
        <p>1 611 ₽</p>
      </Button>
      <div className={cls.delivery}>
        Способ получения: Самовывоз ул. Первая, д.2
      </div>
    </div>
  );
}