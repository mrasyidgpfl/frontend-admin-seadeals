import React, { FC } from 'react';
import loadingLogo from '../../assets/svg/loading.svg';

interface LoadingProp {
  height: number
}

const Loading:FC<LoadingProp> = ({ height }) => (
  <div className="d-flex justify-content-center my-3">
    <img src={loadingLogo} alt="loading" height={height} />
  </div>
);

export default Loading;
