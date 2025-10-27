'use client'

import { useSelector } from "react-redux";
import { ContentContainer } from "../../../../ui/ContentContainer/ContentContainer";
import { BasketProductsList } from "./BasketProductsList/BasketProductsList";
import { BasketSummary } from "./BasketSummary/BasketSummary";
import { basketIsEmptySelector } from "../../../../store/basket/selectors";
import { BasketProductsEmptyList } from "./BasketProductsList/BasketProductsEmptyList/BasketProductsEmptyList";
import cls from './BasketLayout.module.scss';

export const BasketLayout: React.FC = () => {
  const isBasketEmpty = useSelector(basketIsEmptySelector)

  if (isBasketEmpty) {
    return (
      <ContentContainer className={cls.containerEmptyList}>
        <BasketProductsEmptyList />
      </ContentContainer>
    )
  }

  return (
    <ContentContainer className={cls.container}>
      <BasketProductsList />
      <BasketSummary />
    </ContentContainer>
  );
};