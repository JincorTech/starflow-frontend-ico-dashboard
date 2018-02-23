import React, { Component } from 'react';
import classNames from 'classnames/bind';
import s from './styles.css';

const cx = classNames.bind(s);

class Password extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false
    };

    this._handleClick = this._handleClick.bind(this);
  }

  _handleClick() {
    this.setState((prevState) => ({ visible: !prevState.visible }));
  }

  render() {
    const {
      invalid, valid, bright, ...restProps
    } = this.props;
    const { visible } = this.state;

    const getMainStyle = () => {
      if (invalid) return s.invalid;
      if (valid) return s.valid;

      return s.password;
    };

    const className = cx(
      getMainStyle(),
      bright ? s.bright : null
    );

    return (
      <div className={s.wrap}>
        <input className={className} {...restProps} type={visible ? 'text' : 'password'}/>
        <img className={visible ? s.active : s.eye} src={require('./images/eye.svg')} onClick={this._handleClick}/>
      </div>
    );
  }
}

export default Password;
