/**
 * 두 점 사이에 살짝 이동된 직선을 그리고 화살표를 추가합니다.
 * @param ctx CanvasRenderingContext2D
 * @param fromX 시작 노드의 x 좌표
 * @param fromY 시작 노드의 y 좌표
 * @param toX 끝 노드의 x 좌표
 * @param toY 끝 노드의 y 좌표
 * @param offset 직선을 분리하는 오프셋 (양수: 왼쪽/위로, 음수: 오른쪽/아래로 이동)
 */
export const drawSingleLineWithOffset = (param: {
  ctx: CanvasRenderingContext2D;
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  offset: number;
}) => {
  const { ctx, fromX, fromY, toX, toY, offset } = param;

  const dx = toX - fromX;
  const dy = toY - fromY;
  const len = Math.sqrt(dx * dx + dy * dy);

  // 선을 위/아래로 이동시키기 위한 오프셋 계산 (노말벡터 사용)
  const offsetX = (dy / len) * offset;
  const offsetY = (-dx / len) * offset;

  ctx.beginPath();
  ctx.moveTo(fromX + offsetX, fromY + offsetY);
  ctx.lineTo(toX + offsetX, toY + offsetY);
  ctx.stroke();

  // 화살표 그리기
  const angle = Math.atan2(toY - fromY, toX - fromX); // 방향 계산
  const headLength = 10; // 화살표 크기

  ctx.beginPath();
  ctx.moveTo(toX + offsetX, toY + offsetY); // 화살표 시작점

  // 화살표 좌측 날개
  ctx.lineTo(
    toX + offsetX - headLength * Math.cos(angle - Math.PI / 6),
    toY + offsetY - headLength * Math.sin(angle - Math.PI / 6)
  );
  ctx.moveTo(toX + offsetX, toY + offsetY);

  // 화살표 우측 날개
  ctx.lineTo(
    toX + offsetX - headLength * Math.cos(angle + Math.PI / 6),
    toY + offsetY - headLength * Math.sin(angle + Math.PI / 6)
  );
  ctx.stroke();

  return { offsetX, offsetY };
};
