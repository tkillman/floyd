import { RoutePath } from '../domain/route.domain';
import { NotFoundPageWrapper } from './NotFoundPage.style';

const NotFoundPage = () => {
  return (
    <NotFoundPageWrapper>
      <a href={RoutePath.WELCOME}>메인 이동 (플로이드 워셜 알고리즘 간편)</a>
      <a href={RoutePath.FL}>플로이드 워셜 알고리즘(방향 존재)</a>
      <a href={RoutePath.DI}>다익스트라 알고리즘</a>
    </NotFoundPageWrapper>
  );
};

export default NotFoundPage;
