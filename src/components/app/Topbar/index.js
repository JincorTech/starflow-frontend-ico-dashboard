import React from 'react';
import s from './styles.css';

import Pagename from '../Pagename';

const Topbar = ({ pathname, openSidebar }) => (
  <div className={s.topbar}>
    <div className={s.title}><Pagename pathname={pathname}/></div>
    <div className={s.faq}>
      <a href="http://help.starflow.com/ico-faqs" target="_blank">
        <img src={require('../../../assets/images/icons/faq.svg')}/> FAQ
      </a>
    </div>
    <div className={s.button}>
      <button onClick={() => openSidebar()}>
        <img src={require('../../../assets/images/icons/burger.svg')}/>
      </button>
    </div>
  </div>
);

export default Topbar;
