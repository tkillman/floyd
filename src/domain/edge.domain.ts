import { Weight } from './weight.domain';

/**
 * 선 도메인
 */
export type Edge = {
  from: number; // 시작 노드
  to: number; // 종료 노드
  weight: Weight; // 가중치(거리)
};
