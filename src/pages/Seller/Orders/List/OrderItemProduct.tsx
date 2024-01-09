import React, { FC } from 'react';
import Formatter from '../../../../utils/formatter';

interface ProductProps {
  product: any
}

const OrderItemProduct:FC<ProductProps> = ({ product }) => {
  const {
    product_detail: productVariant,
    quantity,
    subtotal,
  } = product;

  return (
    <>
      <div className="col-8 d-flex justify-content-between mb-3">
        <div className="d-flex gap-4">
          <div className="order_item_image">
            <img src={productVariant?.photo_url} alt={productVariant?.name} />
          </div>
          <small className="fw-bold">{productVariant?.name}</small>
        </div>
        <p>{`x${quantity}`}</p>
      </div>
      <div className="col-4">
        <p>{Formatter.DisplayPrice(subtotal)}</p>
      </div>
    </>
  );
};

export default OrderItemProduct;
