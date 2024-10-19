import { useRef, useState } from 'react';
import CanvasComponent, {
  RefCanvasComponent,
} from '~/src/ui/common/CanvasComponent';
import InputComponent from '~/src/ui/InputComponent';
import {
  HeaderArea,
  InputWrapper,
  PageWrapper,
  StyledH2,
} from './common/page.style';
import DijkstraComponent from '~/src/ui/dijkstra/DijkstraComponent';
import useDrawNoDirection from '~/src/application/service/canvas/drawNoDirection.service';
import { RoutePath, routePathName } from '~/src/domain/route.domain';

const DijkstraPage = () => {
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

  const drawService = useDrawNoDirection(nodeCount);

  return (
    <PageWrapper>
      <HeaderArea ref={refHeader}>
        <StyledH2>{routePathName(RoutePath.DI)}</StyledH2>
        <InputWrapper>
          <InputComponent
            handleDraw={handleDraw}
            onChangeCount={onChangeCount}
          />
        </InputWrapper>
      </HeaderArea>
      <CanvasComponent ref={refCanvas} drawService={drawService} />
      <DijkstraComponent />
    </PageWrapper>
  );
};

export default DijkstraPage;
