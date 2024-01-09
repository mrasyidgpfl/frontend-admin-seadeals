import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ReactComponent as IconCart } from '../../assets/svg/icon_cart.svg';
import Button from '../../components/Button/Button';
import Form from '../../components/Form/Form';
import SEARCH_INPUT from '../../constants/form';

const NavbarCenterContent = () => {
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();

  const goToCart = () => {
    console.log('GOTOCART');
  };

  const handleInput = (event: any) => {
    event.preventDefault();
    setSearchInput(event.target.value);
  };

  const searchProduct = () => {
    navigate(`search?${searchInput.length > 0 ? `searchInput=${searchInput}` : ''}`);
  };

  return (
    <div className="center_content">
      <Form
        formType="search_product"
        items={SEARCH_INPUT}
        values={searchInput}
        handleInput={handleInput}
        handleSubmitButton={searchProduct}
      />
      <Button
        buttonType="plain"
        iconUrl={IconCart}
        iconName="cart"
        handleClickedButton={goToCart}
      />
    </div>
  );
};

export default NavbarCenterContent;
