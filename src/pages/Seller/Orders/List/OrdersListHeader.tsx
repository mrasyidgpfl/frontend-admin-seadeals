import React from 'react';

const OrdersListHeader = () => (
  <div className="p-4">
    <div className="p-2 border rounded bg-gray row">
      <div className="col-6 row">
        <div className="col-8">
          <p>Produk</p>
        </div>
        <div className="col-4">
          <p>Subtotal Produk</p>
        </div>
      </div>
      <div className="col-2">
        <p>Status</p>
      </div>
      <div className="col-2">
        <p>Jasa Kirim</p>
      </div>
      <div className="col-2">
        <p>Detail</p>
      </div>
    </div>
  </div>
);

export default OrdersListHeader;
