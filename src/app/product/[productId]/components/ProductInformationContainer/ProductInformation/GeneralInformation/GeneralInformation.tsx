'use client';

import React from 'react';
import cls from './GeneralInformation.module.scss';

const temporaryMock = [
  {
    property: 'Цвет',
    result: 'Насыщенного гранатово-красного цвета',
  },
  {
    property: 'Страна',
    result: 'Австралия',
  },
  {
    property: 'Регион',
    result: 'Юго-Восточная Австралия',
  },
  {
    property: 'Сахар',
    result: '900 мм',
  },
  {
    property: 'Виноград',
    result: 'Дюриф: 100%',
  },
  {
    property: 'Объем',
    result: '0,75 л',
  },
] as const;

export const GeneralInformation: React.FC = () => {
  return (
    <div className={cls.container}>
      {temporaryMock.map(({ property, result }) => (
        <div className={cls.block}>
          <span className={cls.property}>{`${property}:`}</span>
          <span className={cls.result}>{result}</span>
        </div>
      ))}
    </div>
  );
};
