import React, { Component } from 'react';
import { connect } from 'react-redux';
import s from './styles.css';

class Investors extends Component {
  render() {
    const { investors } = this.props;
    return (
      <div className={s.table}>
        {investors.map((item, i) => <div className={s.row} key={i}
          data-object-id={item.id}
          data-source={JSON.stringify(item.source)}
        >
          <span className={s.cell}> {item.name} </span>
          <span className={ `${s.cell} ${s.email}` }> {item.email} </span>
          <span className={ `${s.cell} ${s.verified}` }> {item.isVerified ? 'verified' : ''} </span>
        </div>)}
      </div>
    );
  }
}

export default connect(
  (state) => ({
    investors: state.misc.investors.investors,
  }),
  {
  }
)(Investors);
