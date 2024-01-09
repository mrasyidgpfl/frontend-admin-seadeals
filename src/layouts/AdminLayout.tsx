import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar/Sidebar';
import SidebarAdminData from './Sidebar/SidebarAdminData';
import useCheckLogged from '../hooks/useCheckLogged';

const AdminLayout = () => {
  useCheckLogged();

  return (
    <div>
      <Sidebar data={SidebarAdminData} />
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
