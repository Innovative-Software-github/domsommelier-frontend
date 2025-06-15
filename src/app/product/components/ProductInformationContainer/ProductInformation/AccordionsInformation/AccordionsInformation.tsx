'use client';

import React from 'react';
import { Accordion } from '../../../../../../ui/Accordion/Accordion';
import cls from './AccordionsInformation.module.scss';

export const AccordionsInformation: React.FC = () => {
  return (
    <div className={cls.container}>
      <Accordion
        isDefaultOpen
        className={cls.accordion}
        variant="compact"
        title="Аромат"
      >
        Вино обладает полным, богатым, элегантным, гармоничным, хорошо
        сбалансированным вкусом с нотами спелых черных ягод и фруктов, ванили,
        шоколада и дуба. Благодаря высокому содержанию танинов и хорошей
        кислотности вино имеет отличный потенциал выдержки. Послевкусие долгое,
        стойкое, приятное.
      </Accordion>
      <Accordion className={cls.accordion} variant="compact" title="Вкус">
        Вино обладает полным, богатым, элегантным, гармоничным, хорошо
        сбалансированным вкусом с нотами спелых черных ягод и фруктов, ванили,
        шоколада и дуба. Благодаря высокому содержанию танинов и хорошей
        кислотности вино имеет отличный потенциал выдержки. Послевкусие долгое,
        стойкое, приятное.
      </Accordion>
      <Accordion className={cls.accordion} variant="compact" title="Гастропары">
        Вино рекомендуется подавать к блюдам из красного мяса, особенно баранины
        и ягнятины, зрелым сырам.
      </Accordion>
    </div>
  );
};
