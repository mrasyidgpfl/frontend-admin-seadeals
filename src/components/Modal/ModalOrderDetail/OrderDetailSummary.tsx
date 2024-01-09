import React, { FC } from 'react';
import formatter from '../../../utils/formatter';

interface OrderDetailSummaryProps {
  order: any,
}

const OrderDetailSummary:FC<OrderDetailSummaryProps> = ({ order }) => {
  const hasVoucher = !!order.voucher;
  return (
    <>
      <div className="mb-4">
        <p className="fw-bold mb-1">Status Pesanan</p>
        <p className="">{formatter.FormatTitle(order?.status)}</p>
      </div>
      <div className="mb-4">
        <p className="fw-bold mb-1">Alamat Pengiriman</p>
        <p className="">{order?.delivery?.destination_address}</p>
      </div>
      <div className={`${hasVoucher ? 'mb-4' : 'mb-5'}`}>
        <p className="fw-bold mb-1">Kurir</p>
        <p className="">
          {`${formatter.FormatTitle(order?.delivery?.courier)} - Reguler `}
          <span className="text-secondary">{`(${formatter.DisplayPrice(order?.total_delivery)})`}</span>
        </p>
      </div>
      {hasVoucher
        && (
        <div className="mb-5">
          <p className="fw-bold mb-1">Diskon</p>
          <small className="d-block">
            {`${order?.voucher.code} | ${formatter.getDiscountDisplay(
              order.voucher.amount,
              order.voucher.voucher_type,
            )}`}
          </small>
          <small>{`- ${formatter.DisplayPrice(order?.voucher.amount_reduced)}`}</small>
        </div>
        )}
      <div className="mb-4 fw-bold fs-5">
        <p className="mb-1">Total</p>
        <p className="fs-4 text-accent">
          {formatter.DisplayPrice(order?.total_order_price_after_disc)}
        </p>
      </div>
    </>
  );
};

export default OrderDetailSummary;
