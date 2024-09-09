import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { RoutePath } from './domain/route.domain';
import { lazy, Suspense } from 'react';
import NotFoundPage from '~/src/ui/page/NotFoundPage';
import { Loading } from './ui/common/Loading';
import MasterLayout from './ui/common/MasterLayout';

const LazyWelcomePage = lazy(() => import('~/src/ui/page/WelcomePage')); // 플로이드 워셜 알고리즘(Eazy)
const LazyFloydPage = lazy(() => import('~/src/ui/page/FloydPage')); // 플로이드 워셜 알고리즘(Real)
const LazyDijkstraPage = lazy(() => import('~/src/ui/page/DijkstraPage')); // 다익스트라 알고리즘

const App = () => {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path={RoutePath.WELCOME} element={<MasterLayout />}>
            <Route
              index
              element={
                <Suspense fallback={<Loading />}>
                  <LazyWelcomePage />
                </Suspense>
              }
            />
            <Route
              path={RoutePath.FL}
              element={
                <Suspense fallback={<Loading />}>
                  <LazyFloydPage />
                </Suspense>
              }
            />
            <Route
              path={RoutePath.DI}
              element={
                <Suspense fallback={<Loading />}>
                  <LazyDijkstraPage />
                </Suspense>
              }
            />
            {/* 404 Not Found 처리 */}
            <Route
              path="*"
              element={
                <Suspense fallback={<Loading />}>
                  <NotFoundPage />
                </Suspense>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
};

export default App;
