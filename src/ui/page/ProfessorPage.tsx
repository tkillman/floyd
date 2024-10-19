import { useEffect, useRef, useState } from 'react';
import CanvasComponent, { RefCanvasComponent } from '../common/CanvasComponent';
import { PageWrapper } from './common/page.style';
import useDrawFixDirection from '~/src/application/service/canvas/drawFixDirection.service';
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
