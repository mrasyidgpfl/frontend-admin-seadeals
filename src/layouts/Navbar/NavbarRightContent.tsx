import React from 'react';

import Button from '../../components/Button/Button';

const NavbarRightContent = () => {
  const goToRegisterPage = () => {
    window.location.href = '/register';
  };
  const goToLoginPage = () => {
    window.location.href = '/login';
  };

  return (
    <div className="right_content">
      <Button
        buttonType="primary"
        text="Daftar"
        handleClickedButton={goToRegisterPage}
      />
      <Button
        buttonType="primary"
        text="Masuk"
        handleClickedButton={goToLoginPage}
      />
    </div>
  );
};

export default NavbarRightContent;
