import { NameSpace } from '../../const';
import { TState } from '../../types/state';

export const getActiveCity = (state: TState): string => state[NameSpace.App].activeCity;
export const getSortType = (state: TState): string | null => state[NameSpace.App].sortType;
