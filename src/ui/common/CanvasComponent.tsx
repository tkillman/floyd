import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { StyledCanvas } from './CanvasComponent.style';

import { useRecoilState } from 'recoil';
import { DrawService } from '~/src/application/service/canvas/draw.service.type';

import { ctxState } from '~/src/repository/ctx.recoil';
import { debounce } from 'lodash';
interface Props {
  drawService: DrawService;
}

export interface RefCanvasComponent {
  draw: () => void;
}

const CanvasComponent: React.ForwardRefRenderFunction<
  RefCanvasComponent,
  Props
> = ({ drawService }, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ctx, setCtx] = useRecoilState(ctxState);

  const [canvasSize, setCanvasSize] = useState({
    width: window.innerWidth - 50,
    height: window.innerHeight - 200,
  });

  const resizeCanvas = useCallback(
    debounce(() => {
      setCanvasSize({
        width: window.innerWidth - 50,
        height: window.innerHeight - 200,
      });
    }, 300),
    []
  );

  useEffect(() => {
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

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

    drawService.draw({
      ctx: canvasContext,
      canvasWidth: canvasSize.width,
      canvasHeight: canvasSize.height,
      isNew: false,
    });

    return () => {
      // resetMatrixState();
      // setCtx(undefined);
    };
  }, [canvasSize]);

  /**
   * 그래프를 그립니다.
   * @param nodeCount 그래프에 표시할 노드의 개수
   */
  const draw = () => {
    if (!canvasRef?.current) {
      console.log('canvasRef is empty');
      return;
    }

    if (!ctx) {
      console.log('ctx is empty');
      return;
    }

    drawService.draw({
      ctx,
      canvasWidth: canvasSize.width,
      canvasHeight: canvasSize.height,
      isNew: true,
    });
  };

  useImperativeHandle(ref, () => ({
    draw: draw,
  }));

  return (
    <StyledCanvas
      id="graphCanvas"
      ref={canvasRef}
      width={canvasSize.width}
      height={canvasSize.height}
    ></StyledCanvas>
  );
};

export default forwardRef(CanvasComponent);
