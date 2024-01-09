import React, { FC } from 'react';
import VoucherConstant from '../../../../constants/voucher';
import Form from '../../../../components/Form/Form';

const FilterPromotions:FC<any> = ({ status, setStatus }) => {
  const items = [{
    inputType: 'select',
    label: 'status',
    name: 'status',
    options: VoucherConstant.VOUCHER_STATUS,
  }];

  return (
    <div className="container mb-2 mt-4 d-flex text-start">
      <span>Filter berdasarkan status</span>
      <Form formType="select" items={items} values={status} handleInput={(e) => setStatus(e.target.value)} />
    </div>
  );
};

export default FilterPromotions;
