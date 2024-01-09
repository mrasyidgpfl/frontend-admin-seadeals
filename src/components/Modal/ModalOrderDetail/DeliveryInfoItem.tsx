import React, { FC } from 'react';

interface Props {
  header: string,
  value: string,
}

const DeliveryInfoItem:FC<Props> = ({ header, value }) => (
  <div className="mb-3">
    <p className="mb-1">{header}</p>
    <p className="fw-bold">{value}</p>
  </div>
);

export default DeliveryInfoItem;
