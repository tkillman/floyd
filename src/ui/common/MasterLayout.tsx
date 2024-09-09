import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { MasterLayoutWrapper } from './masterLayout.style';
import MenuComponent from '../MenuComponent';

const MasterLayout: FC = () => {
  return (
    <MasterLayoutWrapper>
      <MenuComponent />
      <Outlet />
    </MasterLayoutWrapper>
  );
};

export default MasterLayout;
