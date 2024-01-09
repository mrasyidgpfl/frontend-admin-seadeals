import { Link, useLocation } from 'react-router-dom';
import React, { FC, useState } from 'react';

const SubMenu:FC<any> = ({ item }) => {
  const [showSubNav, setShowSubNav] = useState(false);
  const location = useLocation();

  const toggleSubNav = () => setShowSubNav(!showSubNav);

  const iconChevron = () => {
    if (item.subNav) {
      if (showSubNav) {
        return React.createElement(item.iconOpened, { className: 'chevron-up' });
      }
      return React.createElement(item.iconClosed, { className: 'chevron-down' });
    } return null;
  };

  return (
    <div>
      <Link
        className={item.path === location.pathname ? 'sub-menu with-arrow active' : 'sub-menu with-arrow'}
        to={item.path}
        onClick={(e) => {
          if (item.subNav) {
            e.preventDefault();
            toggleSubNav();
          }
        }}
      >
        <div>
          {React.createElement(item.icon, { className: 'nav-icon' })}
          <span className="sub-menu__label">{item.title}</span>
        </div>
        <div>
          {iconChevron()}
        </div>
      </Link>
      <div className="d-flex flex-column align-items-start ms-4">
        {showSubNav && item.subNav?.map((t:any) => (
          <Link to={t.path} key={t.path} className={t.path === location.pathname ? 'sub-menu active' : 'sub-menu'}>
            {React.createElement(t.icon, { className: 'nav-icon' })}
            <span className="sub-menu__label">{t.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SubMenu;
