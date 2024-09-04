import { useRecoilValue } from 'recoil';
import { matrixState } from '../repository/matrix.recoil';
import DOMPurify from 'dompurify';
import { Matrix } from '../domain/matrix.domain';
import { useCallback, useEffect, useState } from 'react';
import { produce } from 'immer';
import { ButtonWrapper, StyledButton } from './FloydComponent.style';

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

  const renderMatrixToTable = useCallback(
    (paramMatrix: Matrix, title: string) => {
      const nodeCount = paramMatrix.length;

      if (paramMatrix.length === 0) {
        return '';
      }

      let tableHTML = `<h2>${title}</h2>
    <table>
    <tr>
      <th class="diagonal">
        <span class="top-text">도착</span>  
        <span class="bottom-text">출발</span>
      </th>`;

      for (let i = 0; i < nodeCount; i++) {
        tableHTML += `<th>${i + 1}</th>`;
      }
      tableHTML += '</tr>';

      // 행 데이터 작성
      for (let i = 0; i < nodeCount; i++) {
        tableHTML += `<tr><th>${i + 1}</th>`;
        for (let j = 0; j < nodeCount; j++) {
          tableHTML += `<td>${
            paramMatrix[i][j] === Infinity ? '무한' : paramMatrix[i][j]
          }</td>`;
        }
        tableHTML += '</tr>';
      }

      tableHTML += '</table>';

      const sanitizedHtml = DOMPurify.sanitize(tableHTML);

      return sanitizedHtml;
    },
    []
  );

  /**
   * 플로이드 워셜 알고리즘을 수행합니다.
   * @param matrix
   */
  const floydWarshall = () => {
    setFloydMatrix((prev) =>
      produce(prev, (draft) => {
        const nodeCount = draft.length;
        // 플로이드-워셜 알고리즘
        for (let k = 0; k < nodeCount; k++) {
          for (let i = 0; i < nodeCount; i++) {
            for (let j = 0; j < nodeCount; j++) {
              const compareValue = draft[i][k] + draft[k][j];

              if (draft[i][j] > compareValue) {
                draft[i][j] = compareValue;
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
    <div>
      <div
        dangerouslySetInnerHTML={{
          __html: renderMatrixToTable(matrix, '경로 테이블'),
        }}
      ></div>
      <ButtonWrapper>
        <StyledButton type="button" onClick={onClickFloyd}>
          최단 경로를 구해줘!!
        </StyledButton>
      </ButtonWrapper>
      {isLoading && <div>계산 중...</div>}
      {!isLoading && (
        <div
          dangerouslySetInnerHTML={{
            __html: renderMatrixToTable(floydMatrix, '최단 경로 테이블'),
          }}
        ></div>
      )}
    </div>
  );
};

export default FloydComponent;
