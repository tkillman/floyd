import { RoutePath, routePathName } from '../domain/route.domain';
import { NotFoundPageWrapper } from './NotFoundPage.style';

const NotFoundPage = () => {
  return (
    <NotFoundPageWrapper>
      <a href="/">메인이동</a>
      {Object.values(RoutePath).map((path) => {
        return (
          <a key={path} href={path}>
            {routePathName(path)}
          </a>
        );
      })}
    </NotFoundPageWrapper>
  );
};

export default NotFoundPage;
