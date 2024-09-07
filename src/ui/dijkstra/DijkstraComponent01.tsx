import { useCallback, useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { Matrix } from '~/src/domain/matrix.domain';
import {
  renderDistanceToTable,
  renderMatrixToTable,
} from '~/src/lib/dompurifyUtil';
import { matrixState } from '~/src/repository/matrix.recoil';
import { Button, Input } from '../common';
import { ButtonWrapper } from './DijkstraComponent.style';
import { Distance } from '~/src/domain/distance.domain';

type Path = Array<number>;

type visited = Array<boolean>;

const DijkstraComponent = () => {
  const matrix = useRecoilValue(matrixState);
  const refDijkstraMatrix = useRef<Matrix>([]); // 다익스트라 알고리즘을 위한 매트릭스

  const [distancesState, setDistanceState] = useState<Distance>([]); // 거리 저장용도
  const [pathState, setPathState] = useState<Path>([]); // 경로 저장용도

  const refInputStartNodeNum = useRef<HTMLInputElement>(null);
  const [startNodeNum, setStartNodeNum] = useState<string>(''); // 시작 노드 번호

  const [htmlDistanceTable, setHtmlDistanceTable] = useState<string>(''); // 최단거리 테이블

  const findMinDistance = (distances: Distance, visited: visited) => {
    let minDistance = Infinity;
    let minIndex = -1;

    for (let i = 0; i < distances.length; i++) {
      if (!visited[i] && distances[i] < minDistance) {
        minDistance = distances[i];
        minIndex = i;
      }
    }

    return minIndex;
  };

  const dijkstra = useCallback((start: number) => {
    const dijkstraMatrix = refDijkstraMatrix.current;

    const nodeCount = dijkstraMatrix.length;

    const distances: Distance = Array(nodeCount).fill(Infinity); // 거리 저장용도
    const previous: Path = Array(nodeCount).fill(-1); // 경로 저장용도
    const visited: visited = Array(nodeCount).fill(false); // 방문 여부 저장용도

    distances[start] = 0;

    for (let i = 0; i < nodeCount; i++) {
      const current = findMinDistance(distances, visited);
      if (current === -1) break;
      visited[current] = true;

      for (let neighbor = 0; neighbor < nodeCount; neighbor++) {
        if (
          !visited[neighbor] &&
          dijkstraMatrix[current][neighbor] !== Infinity
        ) {
          const newDistance =
            distances[current] + dijkstraMatrix[current][neighbor];
          if (newDistance < distances[neighbor]) {
            distances[neighbor] = newDistance;
            previous[neighbor] = current;
          }
        }
      }
    }

    return { distances, previous };
  }, []);

  useEffect(() => {
    refDijkstraMatrix.current = matrix;

    const { distances, previous } = dijkstra(0);
    setDistanceState(distances);
    const end = matrix.length - 1;

    setPathState(getPath(end, previous));

    return () => {
      refDijkstraMatrix.current = [];
    };
  }, [matrix, dijkstra]);

  // 경로 추적 함수
  const getPath = (end: number, previous: Path) => {
    const path = [];
    for (let at = end; at !== -1; at = previous[at]) {
      path.push(at);
    }
    return path.reverse();
  };

  const onChangeStartNodeNum = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartNodeNum(e.target.value);
  };

  const onClickCalc = () => {
    const nodeNum = Number(startNodeNum);

    if (isNaN(nodeNum)) {
      alert('숫자만 입력해주세요.');
      return;
    }

    if (!(nodeNum > 0 && nodeNum <= matrix.length)) {
      alert(`범위 내의 숫자를 입력해주세요. (1 ~ ${matrix.length})`);
      return;
    }

    const start = nodeNum - 1;

    const { distances, previous } = dijkstra(start);
    setDistanceState(distances);
    setPathState(getPath(matrix.length - 1, previous));

    const html = renderDistanceToTable({
      distance: distances,
      startNodeNum: startNodeNum,
      title: '최단거리 테이블',
    });

    setHtmlDistanceTable(html);
  };

  return (
    <div>
      <h1>선형탐색</h1>
      <div
        dangerouslySetInnerHTML={{
          __html: renderMatrixToTable(matrix, '거리 테이블'),
        }}
      ></div>
      <ButtonWrapper style={{ marginTop: '10px', flexWrap: 'wrap' }}>
        <label htmlFor="startNodeNum">시작 노드 :</label>
        <Input
          ref={refInputStartNodeNum}
          type="number"
          id="startNodeNum"
          value={startNodeNum}
          onChange={onChangeStartNodeNum}
        ></Input>
        <Button type="button" onClick={onClickCalc}>
          최단거리 검색!
        </Button>
      </ButtonWrapper>
      <div
        dangerouslySetInnerHTML={{
          __html: htmlDistanceTable,
        }}
      ></div>
    </div>
  );
};

export default DijkstraComponent;
