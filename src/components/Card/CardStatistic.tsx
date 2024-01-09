import React, { FC } from 'react';
import Tippy from '@tippyjs/react';
import { ReactComponent as IconHelp } from '../../assets/svg/help.svg';
import './Card.scss';

const CardStatistic:FC<any> = ({ title, data, tooltip }) => (
  <div className="card shadow-sm text-start">
    <div className="card-body">
      <p className="card-title d-flex align-items-center gap-1">
        <b>{title}</b>
        <Tippy className="shadow-lg bg-white rounded p-4" content={<small className="">{tooltip}</small>}>
          <IconHelp className="icon-info" />
        </Tippy>
      </p>
      <p className="card-text">{data}</p>
    </div>
  </div>
);

export default CardStatistic;
