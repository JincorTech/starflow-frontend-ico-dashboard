import React, { Component } from 'react';
import { connect } from 'react-redux';
import loadScript from '../../../utils/scriptLoader';
import s from './styles.css';

import notify from '../../../utils/notifications';

import { get } from '../../../utils/fetch';

import Spinner from '../../common/Spinner';

class Verification extends Component {
  constructor(props) {
    super(props);

    this.state = {
      timestamp: 0,
      authorizationToken: '',
      clientRedirectUrl: '',
      jumioIdScanReference: '',
      error: ''
    };
  }

  componentWillMount() {
    loadScript('https://lon.netverify.com/widget/jumio-verify/2.0/iframe-script.js')
      .then(() => {
        get('/kyc/init')
          .then(({ authorizationToken }) => {
            window.JumioClient.setVars({
              authorizationToken
            }).initVerify('jumio');
          })
          .catch((e) => {
            if (e.statusCode >= 500) {
              this.props.notify('error', 'Server error');
            }

            this.setState({ error: e.error });
          });
      });
  }

  render() {
    const { kycStatus } = this.props;

    const renderPage = () => {
      switch (kycStatus) {
        case 'verified':
          return renderSuccess();
        case 'failed':
          return renderFailed();
        case 'pending':
          return renderPending();
        default:
          return renderPlugin();
      }
    };

    const renderFailed = () => (
      <div className={s.status}>
        <div className={s.title}>Verification failure.</div>
        <div className={s.text}>
          We were unable to match your account information automatically and uploaded documents.
          Please reload the page and try again or contact Starflow support.<br/><br/>
          <a href="mailto:support@starflow.com">support@starflow.com</a>
        </div>
      </div>
    );

    const renderSuccess = () => (
      <div className={s.status}>
        <div className={s.title}>Account verification complete</div>
        <div className={s.text}>
          Your personal data has been verified successfully,
          and now you have full access to Starflow crowdsale.
        </div>
      </div>
    );

    const renderPending = () => (
      <div className={s.status}>
        <div className={s.title}>Your account is being verified…</div>
        <div className={s.text}>
          Your documents are successfully uploaded and being processed now.
          This may take up to 15 minutes, please be patient and don’t try to
          relaunch the verification process.
        </div>
      </div>
    );

    const renderPlugin = () => (
      <div id="jumio">
        <div className={s.spinner}>
          <Spinner color="#0080ff"/>
        </div>
      </div>
    );

    return (
      <div>
        {renderPage()}
      </div>
    );
  }
}

export default connect(
  (state) => ({
    kycStatus: state.app.app.user.kycStatus
  }),
  {
    notify
  }
)(Verification);
