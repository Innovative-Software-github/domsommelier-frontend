'use client';

import React from 'react';
import { Accordion } from '../../../../../../../ui/Accordion/Accordion';
import { TProduct } from '../../../../../../../services/products/interfaces/base';
import cls from './AccordionsInformation.module.scss';

export interface IAccordionsInformationProps {
  product: TProduct;
}

export const AccordionsInformation: React.FC<IAccordionsInformationProps> = ({ product }) => {
  const sections = [
    { title: 'Аромат', text: product.aroma },
    { title: 'Вкус', text: product.taste },
    { title: 'Гастропары', text: product.foodPairing },
  ].filter((section) => Boolean(section.text?.trim()));

  if (sections.length === 0) {
    return null;
  }

  return (
    <div className={cls.container}>
      {sections.map((section, index) => (
        <Accordion
          key={section.title}
          isDefaultOpen={index === 0}
          className={cls.accordion}
          variant="compact"
          title={section.title}
        >
          {section.text}
        </Accordion>
      ))}
    </div>
  );
};
