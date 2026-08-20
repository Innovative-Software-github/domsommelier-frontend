// TODO: Подписка на новости в футере временно скрыта из UI — форма была чистой
// декорацией: Input без value/onChange, Button без onClick, никакого запроса
// никуда не уходило (см. аудит). У бэкенда также нет эндпоинта для подписки
// на рассылку. Раскомментировать и доделать, когда:
//   1) на бэке появится эндпоинт подписки (например POST /api/v1/subscribe);
//   2) здесь будет реальная валидация email, вызов API и состояние
//      (загрузка/успех/ошибка, отключение кнопки без согласия на чекбокс).

// import React from 'react';
// import cls from './FooterSubscription.module.scss';
// import { Checkbox } from '@/ui/Checkbox/Checkbox';
// import { TTheme } from '@/constants/theme';
// import { Input } from '../../../../ui/Input/Input';
// import { Button } from '../../../../ui/Button/Button';

// export interface IFooterSubscription {
//   theme: TTheme;
// }

// export const FooterSubscription: React.FC<IFooterSubscription> = ({
//   theme,
// }) => {
//   const [checked, setChecked] = React.useState(false);

//   return (
//     <>
//       <div className={cls.title}>Узнавай о всех новинках первым</div>
//       <Input
//         className={cls.emailInput}
//         theme={theme === 'white' ? 'wineRed' : 'white'}
//         placeholder="Введите свою почту"
//       />

//       <Checkbox
//         theme={theme === 'white' ? 'wineRed' : 'white'}
//         checked={checked}
//         onChange={() => setChecked((prev) => !prev)}
//       >
//         Подписаться на наши новости
//       </Checkbox>

//       <Button className={cls.subscribeButton} variant="outlined">
//         Подписаться на новости
//       </Button>
//     </>
//   );
// };
