import React from 'react';

import { useLocation } from 'react-router-dom';
import Logo from '../../assets/png/logo_sea_deals.png';

const NavbarLeftContent = () => {
  const location = useLocation();

  const goToHomePage = () => {
    if (location.pathname !== '/') {
      window.location.href = '/';
    }
  };

  return (
    <div className="left_content">
      <img
        className="image"
        src={Logo}
        alt="sea_deals"
        onClick={goToHomePage}
        role="presentation"
      />
    </div>
  );
};

export default NavbarLeftContent;
