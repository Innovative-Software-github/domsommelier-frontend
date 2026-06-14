import type { TProduct, TProductCard } from '@/services/products/interfaces/base';
import type { IOrderedProduct } from '@/services/orders/interfaces';

export const STATUS_LABELS: Record<string, string> = {
  NEW: 'Новый',
  CANCELLED: 'Отменён',
  COMPLETED: 'Завершён',
};

export const STATUS_CLASS_KEYS: Record<string, string> = {
  NEW: 'statusNew',
  CANCELLED: 'statusCancelled',
  COMPLETED: 'statusCompleted',
};

export const DEFAULT_STATUS_CLASS_KEY = 'statusDefault';

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function formatPickupDate(dateStr: string): string {
  // Backend возвращает LocalDate в формате YYYY-MM-DD
  const [year, month, day] = dateStr.split('-').map(Number);
  return new Date(year, month - 1, day).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export const PAYMENT_METHOD_LABELS: Record<string, string> = {
  ONSITE: 'При получении',
  ONLINE: 'Онлайн',
};

export function formatAmount(amount: number): string {
  return `${amount.toLocaleString('ru-RU')} ₽`;
}

export function mapOrderItemToProductCard(
  item: IOrderedProduct,
  product?: TProduct,
): TProductCard {
  if (product) {
    return {
      id: product.id,
      article: product.article,
      name: product.name,
      price: item.price,
      discount: null,
      productCountry: product.productCountry,
      productPhoto: product.productPhoto,
      productCategoryName: product.productCategoryName,
      ...(product.details as Record<string, unknown>),
    } as TProductCard;
  }

  return {
    id: item.productId,
    article: item.article,
    name: item.name,
    price: item.price,
    discount: null,
    productCountry: '',
    productPhoto: [],
    productCategoryName: 'accessories',
    producer: item.article,
  } as TProductCard;
}
