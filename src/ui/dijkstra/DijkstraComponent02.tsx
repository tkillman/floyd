import { useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { Matrix } from '~/src/domain/matrix.domain';
import {
  renderDistanceToTable,
  renderMatrixToTable,
} from '~/src/lib/dompurifyUtil';
import { matrixState } from '~/src/repository/matrix.recoil';
import { ButtonWrapper } from './DijkstraComponent.style';
import { Button, Input } from '../common';
import { Distance } from '~/src/domain/distance.domain';
import { PriorityQueue } from '~/src/domain/PriorityQueue.domain';

type Path = Array<number>;

const DijkstraComponent02 = () => {
  const matrix = useRecoilValue(matrixState);
  const refDijkstraMatrix = useRef<Matrix>([]); // 다익스트라 알고리즘을 위한 매트릭스

  const refInputStartNodeNum = useRef<HTMLInputElement>(null);
  const [startNodeNum, setStartNodeNum] = useState<string>(''); // 시작 노드 번호

  const [htmlDistanceTable, setHtmlDistanceTable] = useState<string>(''); // 최단거리 테이블

  useEffect(() => {
    refDijkstraMatrix.current = matrix;

    return () => {
      refDijkstraMatrix.current = [];
    };
  }, [matrix]);

  const dijkstraByQueue = (start: number) => {
    const dijkstraMatrix = refDijkstraMatrix.current;
    const nodeCount = dijkstraMatrix.length;

    const distances: Distance = Array(nodeCount).fill(Infinity); // 거리 저장용도
    const previous: Path = Array(nodeCount).fill(-1); // 경로 저장용도

    const priorityQueue = new PriorityQueue<number>();

    distances[start] = 0;
    priorityQueue.enqueue(start, 0);

    while (!priorityQueue.isEmpty()) {
      const current = priorityQueue.dequeue();
      if (current === undefined) break;

      // 현재 노드의 모든 이웃 노드 탐색
      for (let neighbor = 0; neighbor < nodeCount; neighbor++) {
        const weight = matrix[current][neighbor];

        if (weight > 0) {
          // 0이면 연결되지 않은 노드
          const distance = distances[current] + weight;

          if (distance < distances[neighbor]) {
            distances[neighbor] = distance;
            previous[neighbor] = current;
            priorityQueue.enqueue(neighbor, distance);
          }
        }
      }
    }

    return { distances, previous };
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

    const { distances } = dijkstraByQueue(start);

    const html = renderDistanceToTable({
      distance: distances,
      startNodeNum: startNodeNum,
      title: '최단거리 테이블',
    });

    setHtmlDistanceTable(html);
  };

  return (
    <div>
      <h2>우선순위 큐</h2>
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

export default DijkstraComponent02;
