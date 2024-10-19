import { atom } from 'recoil';

export const ctxState = atom<CanvasRenderingContext2D | undefined>({
  key: 'ctxState',
  default: undefined,
});
