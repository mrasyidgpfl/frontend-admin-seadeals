import React, { FC } from 'react';
import OrderItemProduct from './OrderItemProduct';
import formatter from '../../../../utils/formatter';

interface OrderItemProps {
  order: any,
  viewOrder: ()=>void,
}

const OrderItem:FC<OrderItemProps> = ({ order, viewOrder }) => (
  <div className="container text-start mb-3">
    <div className="rounded-top border border-bottom-0 p-2 px-4 bg-light d-flex justify-content-between">
      <small>{order?.buyer_name}</small>
      <small>{`No. Pesanan ${order.id}`}</small>
    </div>
    <div className="rounded-bottom border p-4 pb-2">
      <div className="row mb-2">
        <div className="col-6 row">
          {order?.order_items?.map((orderItem:any) => (
            <OrderItemProduct
              key={orderItem.id}
              product={orderItem}
            />
          ))}
        </div>
        <div className="col-2 fw-bold">
          <p>{formatter.FormatTitle(order.status)}</p>
        </div>
        <div className="col-2">
          <p>
            {formatter.FormatTitle(order?.delivery?.courier)}
          </p>
        </div>
        <div className="col-2">
          <p
            className="text-main hover-click"
            onClick={() => viewOrder()}
            role="presentation"
          >
            Lihat Rincian
          </p>
        </div>
        <div className="col-6 row pt-2">
          {
            order.voucher && (
            <>
              <div className="col-8" />
              <div className="col-4 text-secondary mb-2">
                <small className="d-block">{`Voucher: ${order.voucher.code}`}</small>
                <small className="fw-bold">{formatter.DisplayPrice(order.voucher.amount_reduced)}</small>
              </div>
            </>
            )
          }
          <div className="col-8" />
          <div className="col-4">
            <p>Total:</p>
            <p className="fw-bold">{formatter.DisplayPrice(order.total_order_price_after_disc)}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default OrderItem;
