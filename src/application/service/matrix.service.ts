import { useSetRecoilState } from 'recoil';
import { Edge } from '~/src/domain/edge.domain';
import { Matrix } from '~/src/domain/matrix.domain';
import { matrixState } from '~/src/repository/matrix.recoil';

const useMatrixService = () => {
  const setMatrixState = useSetRecoilState(matrixState);

  const saveMatrix = (newMatrix: Matrix) => {
    setMatrixState(newMatrix);
  };

  /**
   *  기본 2차원 배열을 생성합니다.
   * @param nodeCount 노드 개수
   * @returns {}
   */
  const getDefaultMatrix = (nodeCount: number): Matrix => {
    const defaultMatrix = Array.from({ length: nodeCount }, (_, i) =>
      Array(nodeCount)
        .fill('')
        .map((_, j) => (i === j ? 0 : Infinity))
    );

    return defaultMatrix;
  };

  /**
   *  방향 그래프의 인접 행렬을 저장합니다.
   * @param nodeCount 노드 개수
   * @param edges 간선 정보
   */
  const saveDirectionMatrix = (nodeCount: number, edges: Edge[]) => {
    const newMatrix = getDefaultMatrix(nodeCount);

    for (let i = 0; i < edges.length; i++) {
      const { from, to, weight } = edges[i];
      newMatrix[from][to] = weight;
    }

    saveMatrix(newMatrix);
  };

  /**
   * 무방향 그래프의 인접 행렬을 저장합니다.
   * @param nodeCount 노드 개수
   * @param edges 간선 정보
   */
  const saveNoDirectionMatrix = (nodeCount: number, edges: Edge[]) => {
    const newMatrix = getDefaultMatrix(nodeCount);

    for (let i = 0; i < edges.length; i++) {
      const { from, to, weight } = edges[i];
      newMatrix[from][to] = weight;
      newMatrix[to][from] = weight;
    }

    saveMatrix(newMatrix);
  };

  return { saveDirectionMatrix, saveNoDirectionMatrix, saveMatrix };
};

export default useMatrixService;
