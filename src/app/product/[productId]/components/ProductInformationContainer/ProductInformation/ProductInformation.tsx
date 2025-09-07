'use client';

import React from 'react';

import cls from './ProductInformation.module.scss';
import { AccordionsInformation } from './AccordionsInformation/AccordionsInformation';
import { GeneralInformation } from './GeneralInformation/GeneralInformation';

export const ProductInformation: React.FC = () => {
  return (
    <div className={cls.container}>
      <h1 className={cls.title}>Караван Дюриф</h1>

      <GeneralInformation />
      <AccordionsInformation />
    </div>
  );
};
