import { productTypeLabels } from '../../../constants/productTypes';
import { PRODUCT_TYPES_SEGMENTS } from '../../../constants/routes';
import { ICategoryLink } from './CategoryLink/CategoryLink';

export const categoryLinksList: readonly ICategoryLink[] = [
  {
    label: productTypeLabels['wine'],
    href: PRODUCT_TYPES_SEGMENTS.wine,
  },
  {
    label: productTypeLabels['spirit'],
    href: PRODUCT_TYPES_SEGMENTS['spirit'],
  },
  {
    label: productTypeLabels['champagne_and_sparkling'],
    href: PRODUCT_TYPES_SEGMENTS.champagne_and_sparkling,
  },
  {
    label: productTypeLabels['low_alcohol'],
    href: PRODUCT_TYPES_SEGMENTS['low_alcohol'],
  },
  {
    label: productTypeLabels['snack'],
    href: PRODUCT_TYPES_SEGMENTS.snack,
  },
  {
    label: productTypeLabels['accessories'],
    href: PRODUCT_TYPES_SEGMENTS.accessories,
  },
] as const;
