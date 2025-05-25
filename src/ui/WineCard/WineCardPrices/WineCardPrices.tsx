import cls from './WineCardPrices.module.scss';

export interface IWineCardPrices {
  current: number;
  old: number;
  showOld: boolean;
}

export const WineCardPrices: React.FC<IWineCardPrices> = ({
  current,
  old,
  showOld,
}) => (
  <div className={cls.prices}>
    <span className={cls.prices__current}>{current} ₽</span>

    {showOld && <span className={cls.prices__old}>{old} ₽</span>}
  </div>
);
