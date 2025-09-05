import { TProductCard } from '../../services/products/interfaces/base';

const join = (...parts: any) => parts.filter(Boolean).join(', ');

export const formatProductCardDescription = (product: TProductCard): string => {
  const country = product.productCountry;

  switch (product.productCategoryName) {
    case 'wine': {
      const { color, type, volume } = product;
      return join(country, color, type, volume);
    }

    case 'spirit': {
      const { category, strength, volume } = product;
      return join(country, category, strength, volume);
    }

    case 'champagne_and_sparkling': {
      const { color, category, content, volume } = product;
      return join(country, color, category, content, volume);
    }

    case 'low_alcohol': {
      const { category, strength, volume } = product;
      return join(country, category, strength, volume);
    }

    case 'snack': {
      const { category, producer } = product;
      return join(country, category, producer);
    }

    case 'accessories': {
      const { producer } = product;
      return join(country, producer);
    }

    default:
      return country || '';
  }
};