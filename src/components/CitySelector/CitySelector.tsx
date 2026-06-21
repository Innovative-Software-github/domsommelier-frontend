'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { Select, ISelectOptions } from '../../ui/Select/Select';
import { useAppDispatch } from '../../store/hooks';
import { currentCitySelector, citiesSelector } from '../../store/city/selectors';
import { setCurrentCity } from '../../store/city/actions';
import { setCityCookie } from '../../services/city/cookie';
import cls from './CitySelector.module.scss';

export const CitySelector = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const currentCity = useSelector(currentCitySelector);
  const cities = useSelector(citiesSelector);

  const options: ISelectOptions[] = React.useMemo(
    () => cities.map((city) => ({ key: city.slug, value: city.name })),
    [cities],
  );

  const selectedOption: ISelectOptions | undefined = React.useMemo(
    () => (currentCity ? { key: currentCity.slug, value: currentCity.name } : undefined),
    [currentCity],
  );

  const handleSelect = (option: ISelectOptions) => {
    const selectedCity = cities.find((city) => city.slug === option.key);
    if (!selectedCity || selectedCity.slug === currentCity?.slug) {
      return;
    }

    dispatch(setCurrentCity(selectedCity));
    setCityCookie(selectedCity.slug);
    // Перерисовать серверные компоненты (каталог и пр.) с новым городом из cookie
    router.refresh();
  };

  console.log(currentCity);

  if (cities.length === 0) {
    return null;
  }

  return (
    <div className={cls.container}>
      <Select
        anchor="Выберите город"
        options={options}
        selectedOption={selectedOption}
        onSelect={handleSelect}
      />
    </div>
  );
};
