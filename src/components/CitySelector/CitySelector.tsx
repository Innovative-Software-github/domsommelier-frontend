'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { Select, ISelectOptions } from '../../ui/Select/Select';
import { useAppDispatch } from '../../store/hooks';
import { currentCitySelector, citiesSelector } from '../../store/city/selectors';
import { setCurrentCity } from '../../store/city/actions';
import cls from './CitySelector.module.scss';

export const CitySelector = () => {
  const dispatch = useAppDispatch();
  const currentCity = useSelector(currentCitySelector);
  const cities = useSelector(citiesSelector);

  const options: ISelectOptions[] = React.useMemo(
    () => cities.map(city => ({
      key: city.id,
      value: city.name,
    })),
    [cities],
  );

  const selectedOption: ISelectOptions | undefined = React.useMemo(
    () => currentCity
      ? {
        key: currentCity.id,
        value: currentCity.name,
      }
      : undefined,
    [currentCity],
  );

  const handleSelect = (option: ISelectOptions) => {
    const selectedCity = cities.find(city => city.id === option.key);
    if (selectedCity) {
      dispatch(setCurrentCity(selectedCity));
    }
  };

  return (
    <div className={cls.container}>
      <Select
        anchor="Выберите город"
        options={options}
        selectedOption={selectedOption}
        onSelect={handleSelect}
      />
    </div>
  )
}