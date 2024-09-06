import { useEffect, useRef, useState } from 'react';
import CanvasComponent, { RefCanvasComponent } from '../ui/CanvasComponent';
import InputComponent from '../ui/InputComponent';
import {
  HeaderArea,
  InputWrapper,
  PageWrapper,
  StyledH2,
} from './common/page.style';
import useDevice from '../lib/device';

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
    console.log(count);
  };
  return (
    <PageWrapper>
      <HeaderArea ref={refHeader}>
        <StyledH2>다익스트라 알고리즘 시각화</StyledH2>
        <InputWrapper>
          <InputComponent handleDraw={handleDraw} />
        </InputWrapper>
      </HeaderArea>
      <CanvasComponent
        ref={refCanvas}
        canvasWidth={canvasWidth}
        canvasHeight={canvasHeight}
      />
      <div>다익 그래프</div>
    </PageWrapper>
  );
};

export default DijkstraPage;
