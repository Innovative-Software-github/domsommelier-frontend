import { BlockContainer } from '../../../../ui/BlockContainer/BlockContainer';
import { Icon } from '../../../../ui/Icon/Icon';
import { IconType } from '../../../../ui/Icon/IconsMapping';
import { Input } from '../../../../ui/Input/Input';
import cls from './Promocode.module.scss';

export interface IPromocodeProps { }

export const Promocode: React.FC<IPromocodeProps> = () => {
  return (
    <BlockContainer>
      <Input
        theme="gray"
        placeholder="Введите промокод"
        elSuffix={
          <button className={cls.button}>
            <Icon type={IconType.ArrowRight_24} />
          </button>
        }
      />
    </BlockContainer>
  );
};  