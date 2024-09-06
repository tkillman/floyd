import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { StyledCanvas } from './CanvasComponent.style';

import { useResetRecoilState } from 'recoil';
import { matrixState } from '~/src/repository/matrix.recoil';
import { DrawService } from '~/src/application/service/canvas/draw.service.type';

interface Props {
  canvasWidth: number;
  canvasHeight: number;
  drawService: DrawService;
}

export interface RefCanvasComponent {
  draw: (nodeCount: number) => void;
}

const CanvasComponent: React.ForwardRefRenderFunction<
  RefCanvasComponent,
  Props
> = ({ canvasWidth, canvasHeight, drawService }, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D>();

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
      setCtx(undefined);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

    drawService.draw({ ctx, canvasWidth, canvasHeight, nodeCount });
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
