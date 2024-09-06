import { Node } from '~/src/domain/node.domain';
import { DrawService } from './draw.service.type';
import { Edge } from '~/src/domain/edge.domain';
import { getRandomWeight } from '~/src/domain/weight.domain';
import useMatrixService from '../matrix.service';

const useDrawNoDirection = (): DrawService => {
  const matrixService = useMatrixService();

  const draw: DrawService['draw'] = (param) => {
    console.log('Draw No direction');

    const { ctx, canvasWidth, canvasHeight, nodeCount } = param;

    const radius = canvasWidth / 3; // 노드들이 위치할 원의 반지름
    const centerX = canvasWidth / 2;
    const centerY = canvasHeight / 2;

    const nodes: Node[] = [];
    const edges: Edge[] = [];

    // 그래프 지우기
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // 노드 위치 계산 (원을 따라 배치)
    for (let i = 0; i < nodeCount; i++) {
      const angle = ((2 * Math.PI) / nodeCount) * i;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      nodes.push({ x, y });
    }

    // 랜덤 간선과 가중치 생성
    const edgeProbability = 0.5;
    for (let i = 0; i < nodeCount; i++) {
      for (let j = 0; j < nodeCount; j++) {
        if (i === j) {
          continue;
        }

        const weight = getRandomWeight();
        if (i === 0) {
          // 마지막 노드는 무조건 연결
          edges.push({ from: i, to: j, weight });
        } else {
          // 이미 연결된 간선이 있는지 확인
          const isAlereadyExist = edges.some((edge) => edge.from === i);
          if (i < j && !isAlereadyExist && Math.random() < edgeProbability) {
            edges.push({ from: i, to: j, weight });
          }
        }
      }
    }

    // 간선 그리기
    ctx.strokeStyle = '#000';
    ctx.font = '16px Arial';
    edges.forEach((edge) => {
      const { from, to, weight } = edge;
      const fromNode = nodes[from];
      const toNode = nodes[to];
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
    nodes.forEach((node, index) => {
      ctx.beginPath();
      ctx.arc(node.x, node.y, 20, 0, 2 * Math.PI);
      ctx.stroke();
      // 노드 번호 표시
      ctx.fillText(String(index + 1), node.x - 5, node.y + 5);
    });

    // 간선 정보를 저장
    matrixService.saveNoDirectionMatrix(nodeCount, edges);
  };

  return {
    draw,
  };
};

export default useDrawNoDirection;
