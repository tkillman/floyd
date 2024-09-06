import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { RoutePath } from './domain/route.domain';
import { lazy } from 'react';
import NotFoundPage from './page/NotFoundPage';

const LazyWelcomePage = lazy(() => import('./page/WelcomePage')); // 플로이드 워셜 알고리즘(Eazy)
const LazyFloydPage = lazy(() => import('./page/FloydPage')); // 플로이드 워셜 알고리즘(Real)
const LazyDijkstraPage = lazy(() => import('./page/DijkstraPage')); // 다익스트라 알고리즘

const App = () => {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path={RoutePath.WELCOME} element={<LazyWelcomePage />} />
          <Route path={RoutePath.FL} element={<LazyFloydPage />} />
          <Route path={RoutePath.DI} element={<LazyDijkstraPage />} />
          {/* 404 Not Found 처리 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
};

export default App;
