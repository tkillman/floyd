import { useRecoilValue } from 'recoil';
import { matrixState } from '~/src/repository/matrix.recoil';
import { Matrix } from '~/src/domain/matrix.domain';
import { useEffect, useState } from 'react';
import { produce } from 'immer';
import { ButtonWrapper, FloydComponentWrapper } from './FloydComponent.style';
import { Button } from '~/src/ui/common/Button.style';
import { renderMatrixToTable } from '~/src/lib/dompurifyUtil';

const FloydComponent = () => {
  const matrix = useRecoilValue(matrixState);
  const [floydMatrix, setFloydMatrix] = useState<Matrix>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setFloydMatrix(matrix);

    return () => {
      setFloydMatrix([]);
    };
  }, [matrix]);

  /**
   * 플로이드 워셜 알고리즘을 수행합니다.
   */
  const floydWarshall = () => {
    setFloydMatrix((prev) =>
      produce(prev, (draft) => {
        const nodeCount = draft.length;
        // 플로이드-워셜 알고리즘
        for (let k = 0; k < nodeCount; k++) {
          // 출발 노드
          for (let a = 0; a < nodeCount; a++) {
            // 도착 노드
            for (let b = 0; b < nodeCount; b++) {
              // i에서 j로 가는 비용과 i에서 k를 거쳐 j로 가는 비용을 비교하여 더 작은 값을 선택
              const compareWeight = draft[a][k] + draft[k][b];

              if (draft[a][b] > compareWeight) {
                draft[a][b] = compareWeight;
              }
            }
          }
        }

        return draft;
      })
    );
  };

  const onClickFloyd = () => {
    setIsLoading(true);
    floydWarshall();
    setIsLoading(false);
  };

  if (matrix.length === 0) {
    return null;
  }

  return (
    <FloydComponentWrapper>
      <div
        dangerouslySetInnerHTML={{
          __html: renderMatrixToTable(matrix, '거리 테이블'),
        }}
      ></div>
      <ButtonWrapper>
        <Button type="button" onClick={onClickFloyd}>
          최단 거리를 구해줘!!
        </Button>
      </ButtonWrapper>
      {isLoading && <div>계산 중...</div>}
      {!isLoading && (
        <div
          dangerouslySetInnerHTML={{
            __html: renderMatrixToTable(floydMatrix, '최단 거리 테이블'),
          }}
        ></div>
      )}
    </FloydComponentWrapper>
  );
};

export default FloydComponent;
