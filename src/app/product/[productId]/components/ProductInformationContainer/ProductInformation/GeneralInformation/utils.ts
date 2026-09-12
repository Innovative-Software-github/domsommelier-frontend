import { TProduct } from '@/services/products/interfaces/base';

export interface IGeneralInformationItem { property: string; result: string }

export const getGeneralInformationData = (product: TProduct): IGeneralInformationItem[] => {
  const result: IGeneralInformationItem[] = [];
  const add = (property: string, value: unknown) => {
    if (value != null && String(value).trim()) result.push({ property, result: String(value) });
  };
  const d = product.details;
  add('Артикул', product.article);
  add('Страна', product.productCountry);
  add('Бренд', product.brand?.label);
  add('Производитель', d.producer);
  if ('color' in d) add('Цвет', d.color);
  if ('subcategory' in d) add('Категория', d.subcategory || d.category);
  else if ('category' in d) add('Категория', d.category);
  if ('type' in d) add('Сахар', d.type);
  if ('content' in d) add('Сахар', d.content);
  if ('volume' in d) add('Объём', d.volume);
  if ('strength' in d && d.strength != null && String(d.strength).trim()) add('Крепость', `${String(d.strength).replace(/\s*%$/, '')}%`);
  if ('productionYear' in d) add('Год урожая', d.productionYear);
  if ('grapes' in d && !('grapeComposition' in d && d.grapeComposition?.length)) add('Виноград', d.grapes?.join(', '));
  if ('features' in d) add('Особенности', d.features?.join(', '));
  if ('pairings' in d) add('Сочетания', d.pairings?.join(', '));
  add('Упаковка', product.packaging?.type?.label);
  if (product.packaging?.giftBox != null) add('Подарочная упаковка', product.packaging.giftBox ? 'Да' : 'Нет');
  return result;
};
