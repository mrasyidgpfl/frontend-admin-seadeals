import React, { FC, useState } from 'react';
import './NavbarSellerAdmin.scss';
import { Link } from 'react-router-dom';
import NavbarMenuItem from './NavbarMenuItem';
import { ReactComponent as IconClose } from '../../../assets/svg/icon_close.svg';
import useAuth from '../../../hooks/useAuth';
import useLogout from '../../../hooks/useLogout';

const NavbarSellerAdmin:FC<any> = () => {
  const [showDropDown, setShowDropDown] = useState(false);
  const logout = useLogout();
  const { auth } = useAuth();
  const { user } = auth;

  return (
    <div className="d-flex align-items-center">
      <Link
        className="navbar__profile"
        to="/"
        onClick={(e) => {
          e.preventDefault();
          setShowDropDown(!showDropDown);
        }}
      >
        <img src={user.avatar_url || 'https://via.placeholder.com/100'} alt="profile" />
        {user.name}
      </Link>
      {showDropDown && (
      <div className="navbar__dropdown-menu shadow" onBlur={() => setShowDropDown(false)}>
        <NavbarMenuItem title="Logout" to="/login" icon={IconClose} handleClick={logout} />
      </div>
      )}
    </div>
  );
};

export default NavbarSellerAdmin;
