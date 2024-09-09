import { useState } from 'react';
import { MenuComponentWrapper, MenuLi } from './MenuComponent.style';
import { Button } from './common';
import { RoutePath, routePathName } from '../domain/route.domain';

const MenuComponent = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  return (
    <MenuComponentWrapper>
      <Button onClick={toggleMenu}>메뉴 {isMenuOpen ? '닫기' : '열기'}</Button>
      {isMenuOpen && (
        <nav className="menu">
          <ul>
            {Object.values(RoutePath).map((path) => {
              return (
                <MenuLi key={path}>
                  <a href={path}>{routePathName(path)}</a>
                </MenuLi>
              );
            })}
          </ul>
        </nav>
      )}
    </MenuComponentWrapper>
  );
};

export default MenuComponent;
