import type { TProductType } from '../../../constants/productTypes';
import { TAccessoriesProduct } from './accessories';
import { TChampagneAndSparklingProduct } from './champagneAndSparkling';
import { TSpiritProduct } from './spirit';
import { TSnackProduct } from './snack';
import { TWineProduct } from './wine';
import { TLowAlcoholProduct } from './lowAlcohol';

export interface IProductPhoto {
  id: string;
  bucket: string;
  name: string;
  description: string;
  url: string;
}

export interface IBaseProduct<ProductType extends TProductType, TDetails> {
  id: string;
  article: string;
  name: string;
  initialPrice: number;
  price: number;
  description: string | null;
  discount: number | null;
  createdAt: string;
  productCountry: string;
  productCategoryName: ProductType;
  productPhoto: IProductPhoto[];
  details: TDetails;
}

export interface IBaseProductCard extends Pick<IBaseProduct<TProductType, unknown>, 
| 'article' 
| 'discount' 
| 'id' 
| 'name' 
| 'price' 
| 'productCategoryName' 
| 'productCountry' 
| 'productPhoto'> {}

export type IProduct =
  | TWineProduct
  | TSpiritProduct
  | TAccessoriesProduct
  | TSnackProduct
  | TChampagneAndSparklingProduct
  | TLowAlcoholProduct;