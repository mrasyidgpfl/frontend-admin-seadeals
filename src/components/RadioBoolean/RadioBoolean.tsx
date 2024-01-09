import React, { FC } from 'react';

const RadioBoolean:FC<any> = ({
  name, data, handleOnChange,
}) => (
  <div className="d-flex gap-3">
    <div>
      <input
        type="radio"
        name={name}
        onChange={handleOnChange}
        value="true"
        checked={data}
      />
      <label className="mx-1">Ya</label>
      <br />
    </div>
    <div>
      <input
        type="radio"
        name={name}
        onChange={handleOnChange}
        value=""
        checked={!data}
      />
      <label className="mx-1">Tidak</label>
      <br />
    </div>
  </div>
);

export default RadioBoolean;
