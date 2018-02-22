import React, { Component } from 'react';
import { connect } from 'react-redux';
import s from './styles.css';

import Investors from '../Investors';

import { fetchInvestors } from '../../../redux/modules/misc/investors';


class Misc extends Component {
  componentDidMount() {
    const { fetchInvestors } = this.props;

    fetchInvestors();
  }

  render() {
    return (
      <div className={s.wrapper}>
        <div className={s.main}>
          <h2>Investors</h2>
          <Investors/>
        </div>
        <div className={s.col}>
          Misc info
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  {
    fetchInvestors,
  }
)(Misc);
