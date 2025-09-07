import { productType } from '../../../../../../../constants/productTypes';
import { TProduct } from '../../../../../../../services/products/interfaces/base';

interface IGeneralInformationItem {
  property: string;
  result?: string;
}

export const getGeneralInformationData = (product: TProduct): IGeneralInformationItem[] => {
  const result = [];

  switch (product.productCategoryName) {
    case productType.wine:
      result.push({ property: 'Цвет', result: product.details.color });
      result.push({ property: 'Страна', result: product.productCountry });
      result.push({ property: 'Регион', result: 'Доделать' });
      result.push({ property: 'Сахар', result: product.details.type });
      result.push({ property: 'Виноград', result: product.details.grapes.join(', ') });
      result.push({ property: 'Производитель', result: product.details.producer });
      result.push({ property: 'Объем', result: product.details.volume });
      break;

    case productType.spirit:
      result.push({ property: 'Категория', result: product.details.category });
      result.push({ property: 'Страна', result: product.productCountry });
      result.push({ property: 'Крепость', result: product.details.strength });
      result.push({ property: 'Виноград', result: 'Нет винограда' });
      result.push({ property: 'Объем', result: product.details.volume });
      result.push({ property: 'Производитель', result: product.details.producer });
      break;

    case productType.accessories:
      result.push({ property: 'Категория', result: 'Нет категории' });
      result.push({ property: 'Страна', result: product.productCountry });
      result.push({ property: 'Производитель', result: product.details.producer });
      break;

    case productType.snack:
      result.push({ property: 'Категория', result: product.details.category });
      result.push({ property: 'Страна', result: product.productCountry });
      result.push({ property: 'Производитель', result: product.details.producer });
      break;

    case productType.champagne_and_sparkling:
      result.push({ property: 'Цвет', result: product.details.color });
      result.push({ property: 'Категория', result: product.details.category });
      result.push({ property: 'Страна', result: product.productCountry });
      result.push({ property: 'Регион', result: "Нет региона" });
      result.push({ property: 'Сахар', result: product.details.content });
      result.push({ property: 'Виноград', result: 'Нет винограда' });
      result.push({ property: 'Производитель', result: product.details.producer });
      result.push({ property: 'Объем', result: product.details.volume });
      break;

    case productType.low_alcohol:
      result.push({ property: 'Страна', result: product.productCountry });
      result.push({ property: 'Категория', result: product.details.category });
      result.push({ property: 'Крепость', result: product.details.strength });
      result.push({ property: 'Производитель', result: product.details.producer });
      result.push({ property: 'Объем', result: product.details.volume });
      break;

    default:
      break;
  }

  return result;
};
