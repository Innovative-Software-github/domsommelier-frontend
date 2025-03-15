import * as React from 'react';
import { CSSProperties } from 'react';
import clsx from 'clsx';

import { IconType, iconToComponent } from './IconsMapping';

import cls from './Icon.module.scss';

const DISPLAY_NAME = 'Icon';
const DEFAULT_SIZE = 24;

export interface IIconProps {
  className?: string;

  /** Подсказка при наведении */
  title?: string;

  /** Тип */
  type: IconType;

  /**
   * Конкретная высота. Если будет не задана, но при этом буден задан проп width,
   * то высота будет высчитываться автоматически
   */
  height?: number;

  /**
   * Конкретная ширина. Если будет не задана, но при этом буден задан проп height,
   * то ширина будет высчитываться автоматически
   */
  width?: number;

  /**
   * Разрешает svg элементу растягиваться на 100% по ширине и высоте внутри своего контейнера, тем самым
   * позволяя масштабировать иконку на произвольный размер, игнорируя фиксированный размер в разметке
   */
  isScalable?: boolean;

  style?: React.CSSProperties;

  /** Обработчик клика */
  onClick?: () => void;
}

export const Icon = React.forwardRef<HTMLSpanElement, IIconProps>(
  (props, ref) => {
    let { width, height } = props;
    const { type, title, style, isScalable, className, onClick } = props;

    const icon = iconToComponent[type];

    if (!icon) {
      return null;
    }

    if (!width && !height) {
      width = DEFAULT_SIZE;
      height = DEFAULT_SIZE;
    }

    const cssWrapperStyle: CSSProperties = {
      ...(style || {}),
      ...(height ? { height: `${height}px` } : {}),
      ...(width ? { width: `${width}px` } : {}),
    };

    return (
      <span
        ref={ref}
        className={clsx(cls.wrapper, className, {
          [cls.autoWidth]: !width,
          [cls.autoHeight]: !height,
        })}
        style={cssWrapperStyle}
        title={title}
        onClick={onClick}
      >
        <span
          className={clsx(cls.icon, {
            [cls.scalable]: isScalable,
          })}
        >
          {icon}
        </span>
      </span>
    );
  },
);

Icon.displayName = DISPLAY_NAME;
