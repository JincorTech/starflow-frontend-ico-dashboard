import React from 'react';
import { format } from 'date-fns';
import s from './styles.css';

import { shortAddress } from '../../../helpers/common/common';

const User = (props) => {
  const {
    date,
    name,
    walletAddress,
    tokens
  } = props;

  console.log(date);

  return (
    <div className={s.user}>
      <div className={s.info}>
        {date && <div className={s.date}>{format(new Date(date * 1000), 'MM/DD/YYYY')}</div>}
        <div className={s.name}>{name}</div>
        <div className={s.address}>
          <span>Wallet address — </span>
          <a href={`https://etherscan.io/address/${walletAddress}`} target="_blank">{shortAddress(walletAddress)}</a>
        </div>
      </div>
      <div className={s.tokens}>{tokens} JCR</div>
    </div>
  );
};

export default User;
