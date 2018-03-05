import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import s from './styles.css';

import Input from '../../common/Input';
import Button from '../../common/Button';

class Address extends Component {
  constructor(props) {
    super(props);

    this.state = {
      copied: false
    };
  }

  render() {
    const { address, openInvitePopup } = this.props;
    const { copied } = this.state;

    return (
      <div className={s.address}>
        <div className={s.title}>Earn tokens for free</div>
        <div className={s.text}>
        Become a part of Starflows team and help us bring our vision to life.
        All you have to do is to tell
        your contacts about Starflow and invite them to participate in the ICO using the
        unique link below.<br/><br/>
        This program is valid for contributions starting from 0.5 ETH.<br/><br/>
        For more details, please email us directly at <a href="mailto:ico@starflow.com">ico@starflow.com</a> using the subject
        line "Starflow’s Partner Program"
        </div>

        <div className={s.buttons}>
          <Input
            disabled
            value={address}/>
          <div className={s.copy}>
            <CopyToClipboard
              text={address}
              onCopy={() => this.setState({ copied: true })}>
              <Button size="small">
                {copied ? 'Copied' : 'Copy referral address'}
              </Button>
            </CopyToClipboard>
          </div>
          <div className={s.copy}>
            <Button
              size="small"
              styl="secondary"
              onClick={() => openInvitePopup()}>Invite referrals by email</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Address;
