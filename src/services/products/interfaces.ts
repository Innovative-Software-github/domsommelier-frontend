export interface IProductCardPhoto {
  id: string;
  bucket: string;
  name: string;
  description: string;
}

export interface IProductCard {
  id: string;
  article: string;
  name: string;
  price: number;
  discount: number;
  productCountry: string;
  productCategoryName: string;
  productPhoto: IProductCardPhoto[];
}