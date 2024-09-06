import { useEffect, useRef, useState } from 'react';

import CanvasComponent, { RefCanvasComponent } from '~/src/ui/CanvasComponent';
import InputComponent from '~/src/ui/InputComponent';
import useDevice from '~/src/lib/device';
import FloydComponent from '~/src/ui/floyd/FloydComponent';
import {
  HeaderArea,
  InputWrapper,
  PageWrapper,
  StyledH2,
} from './common/page.style';
import { RoutePath, routePathName } from '../domain/route.domain';
import useDrawDirection from '../application/service/canvas/drawDirection.service';
import { DrawService } from '../application/service/canvas/draw.service.type';

const FloydPage = () => {
  const refHeader = useRef<HTMLDivElement>(null);
  const refCanvas = useRef<RefCanvasComponent>(null);

  const [canvasWidth, setCanvasWidth] = useState<number>(0);
  const [canvasHeight, setCanvasHeight] = useState<number>(0);

  const { isPc } = useDevice();

  const handleDraw = (count: number) => {
    if (!count) {
      console.log('count is empty');
      return;
    }
    refCanvas.current?.draw(count);
  };

  useEffect(() => {
    if (isPc) {
      setCanvasWidth(600);
      setCanvasHeight(600);
    } else {
      const headerHeight = refHeader.current?.getBoundingClientRect().height;
      setCanvasWidth(window.innerWidth);
      setCanvasHeight(window.innerHeight - headerHeight! - 5);
    }
  }, [isPc]);

  const drawService: DrawService = useDrawDirection();

  return (
    <PageWrapper>
      <HeaderArea ref={refHeader}>
        <StyledH2>{routePathName(RoutePath.FL)}</StyledH2>
        <InputWrapper>
          <InputComponent handleDraw={handleDraw} />
        </InputWrapper>
      </HeaderArea>
      <CanvasComponent
        ref={refCanvas}
        canvasWidth={canvasWidth}
        canvasHeight={canvasHeight}
        drawService={drawService}
      />
      <FloydComponent />
    </PageWrapper>
  );
};

export default FloydPage;
