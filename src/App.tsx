import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { RoutePath } from './domain/route.domain';
import { lazy } from 'react';

const LazyWelcomePage = lazy(() => import('./page/WelcomePage'));
const LazyDijkstraPage = lazy(() => import('./page/DijkstraPage'));

const App = () => {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path={RoutePath.WELCOME} element={<LazyWelcomePage />} />
          <Route path={RoutePath.DI} element={<LazyDijkstraPage />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
};

export default App;
