import cls from './ProductCardPrices.module.scss';

export interface IProductCardPrices {
  current: number;
  old: number;
  showOld: boolean;
}

export const ProductCardPrices: React.FC<IProductCardPrices> = ({
  current,
  old,
  showOld,
}) => (
  <div className={cls.prices}>
    <span className={cls.prices__current}>{current} ₽</span>

    {showOld && <span className={cls.prices__old}>{old} ₽</span>}
  </div>
);
