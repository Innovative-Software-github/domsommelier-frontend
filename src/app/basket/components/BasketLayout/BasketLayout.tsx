import { ContentContainer } from "../../../../ui/ContentContainer/ContentContainer";
import { BasketProductsList } from "./BasketProductsList/BasketProductsList";
import { BasketSummary } from "./BasketSummary/BasketSummary";
import cls from './BasketLayout.module.scss';

export interface IBasketLayoutProps {}

export const BasketLayout: React.FC<IBasketLayoutProps> = () => {
  return (
    <ContentContainer className={cls.container}>
      <BasketProductsList />
      <BasketSummary />
    </ContentContainer>
  );
};