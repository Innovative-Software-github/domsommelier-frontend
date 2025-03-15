export interface ICatalogLink {
  label: string;
  link: string;
  isPrimary: boolean;
}

export const catalogLinks: ICatalogLink[] = [
  {
    label: '% Акции',
    link: '/',
    isPrimary: true,
  },
  {
    label: 'Дегустации',
    link: '/',
    isPrimary: true,
  },
  {
    label: 'Вина',
    link: '/',
    isPrimary: false,
  },
  {
    label: 'Шампанское и игристые вина',
    link: '/',
    isPrimary: false,
  },
  {
    label: 'Крепкие напитки',
    link: '/',
    isPrimary: false,
  },
  {
    label: 'Слабоалкогольные напитки',
    link: '/',
    isPrimary: false,
  },
  {
    label: 'Закуски',
    link: '/',
    isPrimary: false,
  },
  {
    label: 'Аксессуары',
    link: '/',
    isPrimary: false,
  },
] as const;
