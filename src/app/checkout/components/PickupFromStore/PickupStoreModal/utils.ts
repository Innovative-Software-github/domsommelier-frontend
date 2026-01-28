export interface IStore {
  id: string;
  name: string;
  address: string;
  coordinates: [number, number];
  phone: string;
  workingHours: string;
}

export const MOCK_STORES: IStore[] = [
  {
    id: '1',
    name: 'Винотека "Дом Сомелье" на Тверской',
    address: 'ул. Тверская, д. 12',
    coordinates: [55.764, 37.605],
    phone: '+7 (495) 123-45-67',
    workingHours: 'Пн-Вс: 10:00 - 22:00',
  },
  {
    id: '2',
    name: 'Винотека "Дом Сомелье" в ЦДМ',
    address: 'Лубянский проезд, д. 5',
    coordinates: [55.760, 37.625],
    phone: '+7 (495) 234-56-78',
    workingHours: 'Пн-Вс: 10:00 - 22:00',
  },
  {
    id: '3',
    name: 'Винотека "Дом Сомелье" на Арбате',
    address: 'ул. Арбат, д. 20',
    coordinates: [55.751, 37.590],
    phone: '+7 (495) 345-67-89',
    workingHours: 'Пн-Вс: 10:00 - 22:00',
  },
  {
    id: '4',
    name: 'Винотека "Дом Сомелье" в Крокус Сити',
    address: 'МКАД, 66-й километр, 1',
    coordinates: [55.785, 37.410],
    phone: '+7 (495) 456-78-90',
    workingHours: 'Пн-Вс: 10:00 - 22:00',
  },
  {
    id: '5',
    name: 'Винотека "Дом Сомелье" на Новом Арбате',
    address: 'ул. Новый Арбат, д. 8',
    coordinates: [55.753, 37.597],
    phone: '+7 (495) 567-89-01',
    workingHours: 'Пн-Вс: 10:00 - 22:00',
  },
];

// Центр карты по умолчанию (Москва)
export const DEFAULT_MAP_CENTER: [number, number] = [55.760, 37.600];
export const DEFAULT_MAP_ZOOM = 12;
export const SELECTED_STORE_ZOOM = 14;

// Цвета маркеров на карте
export const MARKER_COLORS = {
  SELECTED: '#8B2323',  // Красный для выбранного магазина
  GRAY: '#6B6B6B',      // Серый
  BLACK: '#1A1A1A',     // Черный по умолчанию
};

