import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { RoutePath } from './domain/route.domain';
import { DijkstraPage, WelcomePage } from './page';

const App = () => {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path={RoutePath.WELCOME} element={<WelcomePage />} />
          <Route path={RoutePath.DI} element={<DijkstraPage />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
};

export default App;
