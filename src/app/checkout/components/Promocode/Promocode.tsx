// TODO: Промокоды временно скрыты из UI — форма не была подключена к API,
// это просто статичный инпут без onChange/onClick (см. аудит).
// Backend уже поддерживает применение промокода к корзине:
//   POST   /api/v1/basket/{customerId}/promo/{promoId}  — BasketController.applyPromo
//   DELETE /api/v1/basket/{customerId}/promo             — BasketController.removePromo
// Но у Promo пока нет admin CRUD (создать промокод негде), поэтому включать
// на клиенте пока не имеет смысла. Раскомментировать и доделать, когда:
//   1) на бэке появится admin-эндпоинт создания/списка промокодов;
//   2) здесь будет реальный вызов applyPromo/removePromo с состоянием
//      (загрузка, ошибка «промокод не найден», применённый промокод в сводке заказа).

// import { BlockContainer } from '../../../../ui/BlockContainer/BlockContainer';
// import { Icon } from '../../../../ui/Icon/Icon';
// import { IconType } from '../../../../ui/Icon/IconsMapping';
// import { Input } from '../../../../ui/Input/Input';
// import cls from './Promocode.module.scss';

// export interface IPromocodeProps { }

// export const Promocode: React.FC<IPromocodeProps> = () => {
//   return (
//     <BlockContainer>
//       <Input
//         theme="gray"
//         placeholder="Введите промокод"
//         elSuffix={
//           <button className={cls.button}>
//             <Icon type={IconType.ArrowRight_24} />
//           </button>
//         }
//       />
//     </BlockContainer>
//   );
// };
