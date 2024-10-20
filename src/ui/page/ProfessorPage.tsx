import { useEffect, useRef } from 'react';
import CanvasComponent, { RefCanvasComponent } from '../common/CanvasComponent';
import { PageWrapper } from './common/page.style';
import useDrawFixDirection from '~/src/application/service/canvas/drawFixDirection.service';
import ProfessorComponent from '../professor/ProfessorComponent';
import { useRecoilValue } from 'recoil';
import { ctxState } from '~/src/repository/ctx.recoil';

const ProfessorPage = () => {
  const refCanvas = useRef<RefCanvasComponent>(null);
  const ctx = useRecoilValue(ctxState);

  const drawService = useDrawFixDirection();

  useEffect(() => {
    if (ctx) {
      refCanvas.current?.draw();
    }
  }, [ctx]);

  return (
    <PageWrapper>
      <CanvasComponent ref={refCanvas} drawService={drawService} />
      <ProfessorComponent />
    </PageWrapper>
  );
};

export default ProfessorPage;
