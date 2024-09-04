import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { StyledCanvas } from './CanvasComponent.style';
import { Node } from '../domain/node.domain';
import { Edge } from '../domain/edge.domain';
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import { matrixState } from '../repository/matrix.recoil';

interface Props {
  canvasWidth: number;
  canvasHeight: number;
}

export interface RefCanvasComponent {
  draw: (nodeCount: number) => void;
}

let retryCount = 0; // 무한루프 방지용
const maxCount = 30; // 무한루프 방지용

const CanvasComponent: React.ForwardRefRenderFunction<
  RefCanvasComponent,
  Props
> = ({ canvasWidth, canvasHeight }, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [ctx, setCtx] = useState<CanvasRenderingContext2D>();
  const nodes = useRef<Node[]>([]);
  const edges = useRef<Edge[]>([]);

  const setMatrixState = useSetRecoilState(matrixState);
  const resetMatrixState = useResetRecoilState(matrixState);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }
    const canvasContext = canvas.getContext('2d');
    if (!canvasContext) {
      return;
    }
    setCtx(canvasContext);

    return () => {
      resetMatrixState();
      nodes.current = [];
      edges.current = [];
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * 1부터 10까지의 랜덤한 가중치를 반환합니다.
   * @returns {number} 랜덤한 가중치
   */
  const getRandomWeight = (): number => {
    const maxWeight = 10;
    return Math.floor(Math.random() * maxWeight) + 1;
  };

  /**
   * 자신 노드를 제외한 랜덤한 노드 번호를 반환합니다.
   * @param maxNum
   * @param from
   * @returns
   */
  const getRandomTo = (maxNum: number, from: number): number => {
    let rtnValue: number = from;

    while (rtnValue === from && retryCount < maxCount) {
      rtnValue = Math.floor(Math.random() * maxNum);
      retryCount++;
    }

    if (retryCount >= maxCount) {
      console.log('retryCount is over');
      if (from === 0) {
        return 1;
      }

      return 0;
    }
    retryCount = 0;
    return rtnValue;
  };

  /**
   * 그래프를 그립니다.
   * @param nodeCount 그래프에 표시할 노드의 개수
   */
  const draw = (nodeCount: number) => {
    if (!canvasRef?.current) {
      console.log('canvasRef is empty');
      return;
    }

    if (!ctx) {
      console.log('ctx is empty');
      return;
    }

    const radius = canvasWidth / 3; // 노드들이 위치할 원의 반지름
    const centerX = canvasWidth / 2;
    const centerY = canvasHeight / 2;
    nodes.current = [];
    edges.current = [];

    const adjacencyMatrix = Array.from({ length: nodeCount }, (_, i) =>
      Array(nodeCount)
        .fill('')
        .map((_, j) => (i === j ? 0 : Infinity))
    );

    // 그래프 지우기
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // 노드 위치 계산 (원을 따라 배치)
    for (let i = 0; i < nodeCount; i++) {
      const angle = ((2 * Math.PI) / nodeCount) * i;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      nodes.current.push({ x, y });
    }

    // 랜덤 간선과 가중치 생성
    const edgeProbability = 0.5;

    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        if (Math.random() < edgeProbability) {
          const weight = getRandomWeight();
          edges.current.push({ from: i, to: j, weight });
          adjacencyMatrix[i][j] = weight;
          adjacencyMatrix[j][i] = weight; // 양방향 간선
        }
      }
    }

    // 연결된 간선이 없는 경우 최소 1개의 간선을 추가
    for (let i = 0; i < nodeCount; i++) {
      if (edges.current.every((edge) => edge.from !== i && edge.to !== i)) {
        //const to = Math.floor(Math.random() * (nodeCount - 1));
        const to = getRandomTo(nodeCount - 1, i);
        const weight = getRandomWeight();
        edges.current.push({ from: i, to, weight });
        adjacencyMatrix[i][to] = weight;
        adjacencyMatrix[to][i] = weight; // 양방향 간선
      }
    }

    // 간선 그리기
    ctx.strokeStyle = '#000';
    ctx.font = '16px Arial';
    edges.current.forEach((edge) => {
      const { from, to, weight } = edge;
      const fromNode = nodes.current[from];
      const toNode = nodes.current[to];
      // 선 그리기
      ctx.beginPath();
      ctx.moveTo(fromNode.x, fromNode.y);
      ctx.lineTo(toNode.x, toNode.y);
      ctx.stroke();
      // 가중치 표시
      const midX = (fromNode.x + toNode.x) / 2;
      const midY = (fromNode.y + toNode.y) / 2;
      ctx.fillText(String(weight), midX, midY);
    });

    // 노드 그리기
    ctx.fillStyle = '#ff6347';
    nodes.current.forEach((node, index) => {
      ctx.beginPath();
      ctx.arc(node.x, node.y, 20, 0, 2 * Math.PI);
      ctx.stroke();
      // 노드 번호 표시
      ctx.fillText(String(index + 1), node.x - 5, node.y + 5);
    });

    setMatrixState(adjacencyMatrix);
  };

  useImperativeHandle(ref, () => ({
    draw: draw,
  }));

  return (
    <StyledCanvas
      id="graphCanvas"
      ref={canvasRef}
      width={canvasWidth}
      height={canvasHeight}
    ></StyledCanvas>
  );
};

export default forwardRef(CanvasComponent);
