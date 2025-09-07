import type { TProductType } from '../../../constants/productTypes';
import { IAccessoriesProductCard, TAccessoriesProduct } from './accessories';
import { IChampagneAndSparklingProductCard, TChampagneAndSparklingProduct } from './champagneAndSparkling';
import { ISpiritProductCard, TSpiritProduct } from './spirit';
import { ISnackProductCard, TSnackProduct } from './snack';
import { IWineProductCard, TWineProduct } from './wine';
import { ILowAlcoholProductCard, TLowAlcoholProduct } from './lowAlcohol';

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

export interface IBaseProductCard<ProductType extends TProductType>
extends Pick<IBaseProduct<ProductType, unknown>, 
| 'article' 
| 'discount' 
| 'id' 
| 'name' 
| 'price' 
| 'productCountry' 
| 'productPhoto'> {
  productCategoryName: ProductType;
}

export type TProduct =
  | TWineProduct
  | TSpiritProduct
  | TAccessoriesProduct
  | TSnackProduct
  | TChampagneAndSparklingProduct
  | TLowAlcoholProduct;

export type TProductCard =
  | IWineProductCard
  | ISpiritProductCard
  | IAccessoriesProductCard
  | ISnackProductCard
  | IChampagneAndSparklingProductCard
  | ILowAlcoholProductCard;

export type TGetFilteredProductsResponse = TProductCard[];
