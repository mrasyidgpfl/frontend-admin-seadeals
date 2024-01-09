import React, { FC } from 'react';

const InputPreSuffix:FC<any> = ({ value, unit, isSuffix }) => (
  <div className={`input-group ${isSuffix ? 'suffix' : 'prefix'} p-0`}>
    {!isSuffix && <span className="input-group-addon">{unit}</span>}
    <input
      className="form__input"
      value={value || 'Belum ada data'}
      disabled
      readOnly
    />
    {isSuffix && <span className="input-group-addon">{unit}</span>}
  </div>
);

export default InputPreSuffix;
