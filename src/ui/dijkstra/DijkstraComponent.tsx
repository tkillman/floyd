import { lazy, Suspense, useState } from 'react';
import { Button } from '~/src/ui/common';
import { ButtonWrapper } from './DijkstraComponent.style';
import { Loading } from '../common/Loading';

const LazyDijkstraComponent01 = lazy(() => import('./DijkstraComponent01'));
const LazyDijkstraComponent02 = lazy(() => import('./DijkstraComponent02'));

enum Mode {
  Mode01 = 'Mode01',
  Mode02 = 'Mode02',
}

const DijkstraComponent = () => {
  const [mode, setMode] = useState<Mode>(Mode.Mode01);

  const onClickMode = (paramMode: Mode) => () => {
    setMode(paramMode);
  };

  return (
    <div>
      <ButtonWrapper>
        <Button
          onClick={onClickMode(Mode.Mode01)}
          $primary={mode === Mode.Mode01}
        >
          선형탐색
        </Button>
        <Button
          onClick={onClickMode(Mode.Mode02)}
          $primary={mode === Mode.Mode02}
        >
          우선순위 큐
        </Button>
      </ButtonWrapper>
      {mode === Mode.Mode01 && (
        <Suspense fallback={<Loading />}>
          <LazyDijkstraComponent01 />
        </Suspense>
      )}
      {mode === Mode.Mode02 && (
        <Suspense fallback={<Loading />}>
          <LazyDijkstraComponent02 />
        </Suspense>
      )}
    </div>
  );
};

export default DijkstraComponent;
