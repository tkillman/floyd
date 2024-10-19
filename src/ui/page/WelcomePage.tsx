import { useRef, useState } from 'react';

import InputComponent from '~/src/ui/InputComponent';
import FloydComponent from '~/src/ui/floyd/FloydComponent';
import {
  HeaderArea,
  InputWrapper,
  PageWrapper,
  StyledH2,
} from './common/page.style';
import { RoutePath, routePathName } from '~/src/domain/route.domain';
import useDrawNoDirection from '~/src/application/service/canvas/drawNoDirection.service';
import { DrawService } from '~/src/application/service/canvas/draw.service.type';
import CanvasComponent, {
  RefCanvasComponent,
} from '~/src/ui/common/CanvasComponent';

const WelcomePage = () => {
  const refHeader = useRef<HTMLDivElement>(null);
  const refCanvas = useRef<RefCanvasComponent>(null);
  const [nodeCount, setNodeCount] = useState<number>(0);

  const drawService: DrawService = useDrawNoDirection(nodeCount);

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

  return (
    <PageWrapper>
      <HeaderArea ref={refHeader}>
        <StyledH2>{routePathName(RoutePath.WELCOME)}</StyledH2>
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

export default WelcomePage;
