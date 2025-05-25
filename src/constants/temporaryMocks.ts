import { IWineCardModel } from '../ui/WineCard/WineCard';

export const wineCardModelMock: IWineCardModel = {
  id: '1',
  imageLink: '/wineBottleCard.png',
  discountPrice: 1611,
  oldPrice: 1614,
  name: 'The Durif Caravan',
  description: {
    country: 'Австралия',
    color: 'красное',
    sweetness: 'сухое',
    displacement: '0.75',
  },
};
