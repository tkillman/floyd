import { useEffect, useRef, useState } from 'react';
import CanvasComponent, { RefCanvasComponent } from '../common/CanvasComponent';
import useDevice from '~/src/lib/device';
import { PageWrapper } from './common/page.style';
import useDrawFixDirection, {
  NODE_COUNT,
} from '~/src/application/service/canvas/drawFixDirection.service';
import ProfessorComponent from '../professor/ProfessorComponent';

const ProfessorPage = () => {
  const refCanvas = useRef<RefCanvasComponent>(null);

  const drawService = useDrawFixDirection();

  useEffect(() => {
    refCanvas.current?.draw();
  }, []);

  return (
    <PageWrapper>
      <CanvasComponent ref={refCanvas} drawService={drawService} />
      <ProfessorComponent />
    </PageWrapper>
  );
};

export default ProfessorPage;
