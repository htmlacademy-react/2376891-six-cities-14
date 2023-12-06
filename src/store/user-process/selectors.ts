import { NameSpace, AuthorizationStatus } from '../../const';
import { TState } from '../../types/state';
import { TUserData } from '../../types/user-data';

export const getAuthorizationStatus = (state: TState): AuthorizationStatus => state[NameSpace.User].authorizationStatus;
export const getAuthCheckedStatus = (state: TState): boolean => state[NameSpace.User].authorizationStatus !== AuthorizationStatus.Unknown;
export const getUser = (state: TState): TUserData | null => state[NameSpace.User].user;
