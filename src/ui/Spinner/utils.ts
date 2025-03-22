export const spinnerSize = {
  XS: 'xs',
  S: 's',
  M: 'm',
  L: 'l',
  XL: 'xl',
  XXL: 'xxl',
} as const;

export type TSpinnerSize = typeof spinnerSize[keyof typeof spinnerSize];

export const dimensionBySize: Readonly<Record<TSpinnerSize, number>> = {
  xs: 12,
  s: 16,
  m: 20,
  l: 24,
  xl: 32,
  xxl: 64,
};
export const radiusBySize: Readonly<Record<TSpinnerSize, number>> = {
  xs: 3.5,
  s: 5,
  m: 6,
  l: 7,
  xl: 10,
  xxl: 20,
};
export const widthBySize: Readonly<Record<TSpinnerSize, number>> = {
  xs: 1.8,
  s: 2.2,
  m: 3.1,
  l: 3.6,
  xl: 4,
  xxl: 4.8,
};
