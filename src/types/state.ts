import { store } from '../store/index.ts';

export type TState = ReturnType<typeof store.getState>;

export type TAppDispatch = typeof store.dispatch;
