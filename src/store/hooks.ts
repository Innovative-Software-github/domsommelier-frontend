import { useDispatch, useSelector } from 'react-redux';

import type { TAppDispatch, TRootState } from './interfaces';

export const useAppDispatch = () => useDispatch<TAppDispatch>();
export const useAppSelector = useSelector.withTypes<TRootState>();
