import React, { FC } from 'react';
import { Link } from 'react-router-dom';

const NavbarMenuItem:FC<any> = ({
  title, to, icon, handleClick,
}) => (
  <Link
    className="navbar__link"
    to={to}
    onClick={(e) => {
      if (handleClick) {
        e.preventDefault();
        handleClick();
      }
    }}
  >
    {React.createElement(icon, { className: 'navbar__icon' })}
    <span className="navbar__title">{title}</span>
  </Link>
);

export default NavbarMenuItem;
