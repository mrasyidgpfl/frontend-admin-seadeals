import React, { FC } from 'react';

interface Props {
  children: JSX.Element
  text: string
}

const ClickToCopy:FC <Props> = ({ children, text }) => (
  <button
    type="button"
    className="p-0 border d-flex align-items-center rounded-circle"
    style={{
      height: '30px',
      width: '28px',
      marginTop: '1px',
    }}
    onClick={() => navigator.clipboard.writeText(text)}
  >
    {children}
  </button>
);

export default ClickToCopy;
