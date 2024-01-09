import React, { FC } from 'react';
import './Toggle.scss';

interface ToggleProps {
  id: number,
  inputID: string,
  isChecked: boolean,
  handleChange: (e:any)=>void
}

const Toggle:FC<ToggleProps> = ({
  id, inputID, isChecked, handleChange,
}) => (
  <>
    <input
      type="checkbox"
      id={inputID}
      className="toggle-switch"
      defaultChecked={isChecked}
      value={id}
      onChange={handleChange}
    />
    <label htmlFor={inputID} className="toggle-label">Toggle</label>
  </>
);

export default Toggle;
