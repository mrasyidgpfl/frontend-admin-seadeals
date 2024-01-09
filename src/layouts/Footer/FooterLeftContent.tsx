import React from 'react';
import Logo from '../../assets/png/logo_sea_deals.png';

const FooterLeftContent = () => (
  <div className="left_content">
    <img
      className="image"
      src={Logo}
      alt="sea_deals"
    />
    <p className="text">
      Tempat kamu bisa menemukan barang elektronik&nbsp;
      yang kamu cari.&nbsp;
      Yuk belanja di SeaDeals saja!
    </p>
  </div>
);

export default FooterLeftContent;
