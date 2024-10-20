import { Edge } from '~/src/domain/edge.domain';
import useMatrixService from '../matrix.service';
import { DrawService } from './draw.service.type';
import { Node } from '~/src/domain/node.domain';
import { drawSingleLineWithOffset } from '~/src/lib/canvasUtil';

const useDrawFixDirection = (): DrawService => {
  const matrixService = useMatrixService();

  const draw: DrawService['draw'] = (param) => {
    const { ctx, canvasWidth, canvasHeight, isNew } = param;

    const standX = canvasWidth / 3;
    const nodes: Node[] = [
      { x: standX, y: 100 },
      { x: standX / 2, y: 300 },
      { x: (standX * 3) / 2, y: 300 },
      { x: standX * 2.5, y: 300 },
      { x: standX, y: 500 },
    ];
    const nodeCount = nodes.length;
    const edges: Edge[] = [
      // 1번 노드 출발
      {
        from: 0,
        to: 1,
        weight: 3,
      },
      {
        from: 0,
        to: 2,
        weight: 2,
      },
      {
        from: 0,
        to: 3,
        weight: 4,
      },
      // 2번 노드 출발
      {
        from: 1,
        to: 0,
        weight: 1,
      },
      {
        from: 1,
        to: 4,
        weight: 2,
      },
      // 3번 노드 출발
      {
        from: 2,
        to: 0,
        weight: 7,
      },
      {
        from: 2,
        to: 3,
        weight: 1,
      },
      {
        from: 2,
        to: 4,
        weight: 4,
      },
      // 4번 노드 출발
      {
        from: 3,
        to: 0,
        weight: 2,
      },
      {
        from: 3,
        to: 2,
        weight: 2,
      },
      {
        from: 3,
        to: 4,
        weight: 4,
      },
      // 5번 노드 출발
      {
        from: 4,
        to: 1,
        weight: 2,
      },
      {
        from: 4,
        to: 2,
        weight: 3,
      },
      {
        from: 4,
        to: 3,
        weight: 3,
      },
    ];

    // 그래프 지우기
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // 간선 그리기
    ctx.strokeStyle = '#000';
    ctx.font = '16px Arial';

    edges.forEach((edge) => {
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
      ctx.fillText(String(index), node.x - 5, node.y + 5);
    });
    console.log('데이터 저장', isNew);
    // 간선 정보를 저장
    if (isNew) {
      // 간선 정보를 저장
      matrixService.saveDirectionMatrix(nodeCount, edges);
    }
  };

  return { draw };
};

export default useDrawFixDirection;
