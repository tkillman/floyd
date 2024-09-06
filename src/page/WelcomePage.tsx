import { useEffect, useRef, useState } from 'react';

import CanvasComponent, {
  RefCanvasComponent,
} from '~/src/ui/dijkstra/CanvasComponent';
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
import useDrawNoDirection from '../application/service/canvas/drawNoDirection.service';
import { DrawService } from '../application/service/canvas/draw.service.type';

const WelcomePage = () => {
  const refHeader = useRef<HTMLDivElement>(null);
  //const refInput = useRef<RefInputComponent>(null);
  const refCanvas = useRef<RefCanvasComponent>(null);

  const [canvasWidth, setCanvasWidth] = useState<number>(0);
  const [canvasHeight, setCanvasHeight] = useState<number>(0);

  const { isPc } = useDevice();

  const handleDraw = (count: number) => {
    //const count = refInput.current?.getCount();

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
      setCanvasHeight(window.innerHeight - headerHeight! - 5); // 5px gap
    }
  }, [isPc]);

  const drawService: DrawService = useDrawNoDirection();

  return (
    <PageWrapper>
      <HeaderArea ref={refHeader}>
        <StyledH2>{routePathName(RoutePath.WELCOME)}</StyledH2>
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

export default WelcomePage;
