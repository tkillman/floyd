import { atom } from 'recoil';
import { Matrix } from '../domain/matrix.domain';

export const matrixState = atom<Matrix>({
  key: 'matrixState',
  default: [],
});
