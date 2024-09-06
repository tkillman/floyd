export enum RoutePath {
  'WELCOME' = '/',
  'FL' = '/fl',
  'DI' = '/di',
}

/**
 * 경로에 따른 이름 반환
 * @param routePath  경로
 * @returns
 */
export const routePathName = (routePath: RoutePath) => {
  let pathName = '미정';

  switch (routePath) {
    case RoutePath.WELCOME:
      pathName = '플로이드 워셜 알고리즘(Eazy)';
      return pathName;
    case RoutePath.FL:
      pathName = '플로이드 워셜 알고리즘(Real)';
      return pathName;
    case RoutePath.DI:
      pathName = '다익스트라 알고리즘';
      return pathName;

    default:
      return pathName;
  }
};
