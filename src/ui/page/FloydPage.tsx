import { useRef, useState } from 'react';

import CanvasComponent, {
  RefCanvasComponent,
} from '~/src/ui/common/CanvasComponent';
import InputComponent from '~/src/ui/InputComponent';
import FloydComponent from '~/src/ui/floyd/FloydComponent';
import {
  HeaderArea,
  InputWrapper,
  PageWrapper,
  StyledH2,
} from './common/page.style';
import { RoutePath, routePathName } from '~/src/domain/route.domain';
import useDrawDirection from '~/src/application/service/canvas/drawDirection.service';
import { DrawService } from '~/src/application/service/canvas/draw.service.type';

const FloydPage = () => {
  const refHeader = useRef<HTMLDivElement>(null);
  const refCanvas = useRef<RefCanvasComponent>(null);
  const [nodeCount, setNodeCount] = useState<number>(0);

  const onChangeCount = (count: number) => {
    setNodeCount(count);
  };

  const handleDraw = (count: number) => {
    if (!count) {
      console.log('count is empty');
      return;
    }
    refCanvas.current?.draw();
  };

  const drawService: DrawService = useDrawDirection(nodeCount);

  return (
    <PageWrapper>
      <HeaderArea ref={refHeader}>
        <StyledH2>{routePathName(RoutePath.FL)}</StyledH2>
        <InputWrapper>
          <InputComponent
            handleDraw={handleDraw}
            onChangeCount={onChangeCount}
          />
        </InputWrapper>
      </HeaderArea>
      <CanvasComponent ref={refCanvas} drawService={drawService} />
      <FloydComponent />
    </PageWrapper>
  );
};

export default FloydPage;
