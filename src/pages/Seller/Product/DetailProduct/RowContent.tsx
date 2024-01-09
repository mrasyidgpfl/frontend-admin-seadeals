import React, { FC } from 'react';

const RowContent:FC<any> = ({
  label, value, element, children,
}) => (
  <div className="row my-2">
    <div className="col-3 d-flex align-items-center justify-content-end"><span>{label}</span></div>
    <div className="col-9">
      {element === undefined && <input className="form__input" value={value} readOnly disabled />}
      {element === 'textarea' && <textarea className="form__input" value={value} readOnly disabled />}
      {element === 'children' && children}
      {element === 'boolean' && <input className="form__input" value={value ? 'Ya' : 'Tidak'} readOnly disabled />}
    </div>
  </div>
);

export default RowContent;
