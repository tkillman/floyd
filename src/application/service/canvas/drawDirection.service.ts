import { Node } from '~/src/domain/node.domain';
import { DrawService } from './draw.service.type';
import { Edge } from '~/src/domain/edge.domain';
import { getRandomWeight } from '~/src/domain/weight.domain';
import useMatrixService from '../matrix.service';
import { drawSingleLineWithOffset } from '~/src/lib/canvasUtil';

let edges: Edge[] | undefined = undefined;

const useDrawDirection = (nodeCount: number): DrawService => {
  const matrixService = useMatrixService();

  /**
   * 방향 그래프를 그립니다.
   */
  const draw: DrawService['draw'] = (param) => {
    const { ctx, canvasWidth, canvasHeight, isNew } = param;

    const radius = canvasWidth / 3; // 노드들이 위치할 원의 반지름
    const centerX = canvasWidth / 2;
    const centerY = canvasHeight / 2;
    const nodes: Node[] = [];

    if (isNew) {
      edges = [];
    }

    // 그래프 지우기
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // 노드 위치 계산 (원을 따라 배치)
    for (let i = 0; i < nodeCount; i++) {
      const angle = ((2 * Math.PI) / nodeCount) * i;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      nodes.push({ x, y });
    }
    if (isNew) {
      // 랜덤 간선과 가중치 생성
      const edgeProbability = 0.5;
      for (let i = 0; i < nodeCount; i++) {
        for (let j = 0; j < nodeCount; j++) {
          if (i === j) {
            // 자기 자신과의 연결은 제외
            continue;
          }

          const weight = getRandomWeight(); // 1부터 10까지의 랜덤한 가중치

          if (i === 0 || i === nodeCount - 1) {
            // 시작 노드와 끝 노드는 무조건 연결
            edges?.push({ from: i, to: j, weight: weight });
          } else {
            if (Math.random() < edgeProbability) {
              // 반반 확률로 연결
              edges?.push({ from: i, to: j, weight: weight });
            }
          }
        }
      }

      // 나가는 간선이 하나도 없는 노드 확인
      for (let k = 0; k < nodeCount; k++) {
        const isExistOut = edges?.some((edge) => edge.from === k);
        if (!isExistOut) {
          //나가는 간선이 없으면 랜덤한 노드로 연결
          let randomNode = Math.floor(Math.random() * nodeCount);
          randomNode = randomNode === k ? randomNode - 1 : randomNode; // 자기 자신과 연결되지 않도록
          const weight = getRandomWeight();
          edges?.push({ from: k, to: randomNode, weight: weight });
        }
      }
    }

    // 간선 그리기
    ctx.strokeStyle = '#000';
    ctx.font = '16px Arial';

    edges?.forEach((edge) => {
      const { from, to, weight } = edge;
      const fromNode = nodes[from];
      const toNode = nodes[to];

      const offset = 20; // 두 평생 사이의 거리

      const { offsetX, offsetY } = drawSingleLineWithOffset({
        ctx,
        fromX: fromNode.x,
        fromY: fromNode.y,
        toX: toNode.x,
        toY: toNode.y,
        offset,
      });

      // 가중치 표시 (양방향 각각 다르게 표시)
      const midX = (fromNode.x + toNode.x) / 2 + offsetX;
      const midY = (fromNode.y + toNode.y) / 2 + offsetY;
      ctx.fillText(String(weight), midX, midY);
    });

    // 노드 그리기
    ctx.fillStyle = '#ff6347';
    nodes.forEach((node, index) => {
      ctx.beginPath();
      ctx.arc(node.x, node.y, 20, 0, 2 * Math.PI);
      ctx.stroke();
      // 노드 번호 표시
      ctx.fillText(String(index + 1), node.x - 5, node.y + 5);
    });

    const newMatrix = Array.from({ length: nodeCount }, (_, i) =>
      Array(nodeCount)
        .fill('')
        .map((_, j) => (i === j ? 0 : Infinity))
    );

    // 간선 정보를 저장
    if (edges) {
      for (let i = 0; i < edges.length; i++) {
        const { from, to, weight } = edges[i];
        newMatrix[from][to] = weight;
      }

      // 간선 정보를 저장
      matrixService.saveDirectionMatrix(nodeCount, edges);
    }
  };

  return {
    draw,
  };
};

export default useDrawDirection;
