import React, { FC } from 'react';
import formatter from '../../../utils/formatter';

interface OrderDetailItemListProps {
  orderItems: any[],
}

const OrderDetailItemList:FC<OrderDetailItemListProps> = ({ orderItems }) => (
  <div className="mb-4">
    <p className="fw-bold mb-2">Produk Pesanan</p>
    <div className="overflow-auto py-2" style={{ maxHeight: '572px' }}>
      {orderItems.map((item:any) => (
        <div key={item.id} className="d-flex gap-3 mb-3">
          <div className="order_item_image">
            <img
              src={item?.product_detail?.photo_url}
              alt={item?.product_detail?.name}
            />
          </div>
          <div className="w-100 pe-3">
            <div className="d-flex justify-content-between">
              <p>
                {formatter.FormatTitle(item?.product_detail?.name)}
              </p>
              <p className="fw-bold mb-1">
                {formatter.DisplayPrice(item?.subtotal)}
              </p>
            </div>
            <p className="text-secondary">
              {formatter.FormatTitle(item?.product_detail?.variant)}
            </p>
            <p className="text-secondary">
              {`Jumlah: ${item?.quantity}`}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default OrderDetailItemList;
