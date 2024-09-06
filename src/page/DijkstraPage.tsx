import { useEffect, useRef, useState } from 'react';
import CanvasComponent, {
  RefCanvasComponent,
} from '~/src/ui/common/CanvasComponent';
import InputComponent from '../ui/InputComponent';
import {
  HeaderArea,
  InputWrapper,
  PageWrapper,
  StyledH2,
} from './common/page.style';
import useDevice from '../lib/device';
import DijkstraComponent from '../ui/dijkstra/DijkstraComponent';
import useDrawNoDirection from '../application/service/canvas/drawNoDirection.service';
import { RoutePath, routePathName } from '../domain/route.domain';

const DijkstraPage = () => {
  const refHeader = useRef<HTMLDivElement>(null);
  //const refInput = useRef<RefInputComponent>(null);
  const refCanvas = useRef<RefCanvasComponent>(null);

  const [canvasWidth, setCanvasWidth] = useState<number>(0);
  const [canvasHeight, setCanvasHeight] = useState<number>(0);

  const { isPc } = useDevice();

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

  const handleDraw = (count: number) => {
    if (!count) {
      console.log('count is empty');
      return;
    }
    refCanvas.current?.draw(count);
  };

  const drawService = useDrawNoDirection();

  return (
    <PageWrapper>
      <HeaderArea ref={refHeader}>
        <StyledH2>{routePathName(RoutePath.DI)}</StyledH2>
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
      <DijkstraComponent />
    </PageWrapper>
  );
};

export default DijkstraPage;
