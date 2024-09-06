import { useEffect, useRef, useState } from 'react';
import {
  AppWrapper,
  HeaderArea,
  InputWrapper,
  StyledH2,
} from '~/src/page/WelcomePage.style';

import CanvasComponent, { RefCanvasComponent } from '~/src/ui/CanvasComponent';
import InputComponent from '~/src/ui/InputComponent';
import useDevice from '~/src/lib/device';
import FloydComponent from '~/src/ui/FloydComponent';

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
      setCanvasHeight(window.innerHeight - headerHeight! - 5);
    }
  }, [isPc]);

  return (
    <AppWrapper>
      <HeaderArea ref={refHeader}>
        <StyledH2>플로이드-워셜 알고리즘 시각화</StyledH2>
        <InputWrapper>
          <InputComponent handleDraw={handleDraw} />
        </InputWrapper>
      </HeaderArea>
      <CanvasComponent
        ref={refCanvas}
        canvasWidth={canvasWidth}
        canvasHeight={canvasHeight}
      />
      <FloydComponent />
    </AppWrapper>
  );
};

export default WelcomePage;
