import React, { FC } from 'react';
import Toggle from '../../../../components/Toggle/Toggle';
import Formatter from '../../../../utils/formatter';

interface CourierBoxProps {
  courier: any,
  handleChange: (e:any)=>void
}

const CourierBox:FC<CourierBoxProps> = ({ courier, handleChange }) => (
  <div className="courier_box">
    <div>
      <p className="fw-bold">{Formatter.FormatTitle(courier.name)}</p>
      <small className="text-secondary">{courier.description}</small>
    </div>
    <div className="d-flex align-items-center">
      <Toggle id={courier.id} inputID={`${courier.name}`} isChecked={courier.used || false} handleChange={handleChange} />
    </div>
  </div>
);
export default CourierBox;
