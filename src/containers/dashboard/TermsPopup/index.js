import React, { Component } from 'react';
import { Field } from 'redux-form';
import { connect } from 'react-redux';
import s from './styles.css';

import { closeTermsPopup } from '../../../redux/modules/dashboard/buyTokens';

import Popup from '../../../components/common/Popup';
import RenderCheckbox from '../../../components/forms/RenderCheckbox';
import Button from '../../../components/common/Button';
import TermsAndConditions from './TermsAndConditions';
import PrivacyPolicy from './PrivacyPolicy';

class TermsPopup extends Component {
  constructor() {
    super();
    this.state = {
      termsAndPolicyRead: false,
      termsAccepted: false,
      policyAccepted: false,
      agreedMarketing: false,
    };
  }

  handleScroll({ target }) {
    if (target.scrollHeight - target.clientHeight === target.scrollTop) {
      this.setState({ termsAndPolicyRead: true });
    }
  }

  handleTermsAccepted({ target }) {
    this.setState({ termsAccepted: target.checked });
  }
  handlePolicyAccepted({ target }) {
    this.setState({ policyAccepted: target.checked });
  }
  handleAgreeMarketing({ target }) {
    this.setState({ agreedMarketing: target.checked });
  }

  render() {
    const { open, closeTermsPopup, onAccepted } = this.props;

    return (
      <Popup
        title="STAR Token Sale Terms and Conditions"
        open={open}
        close={() => closeTermsPopup()}
        className="large-popup"
        hideCloseButton={true}
      >
        <div className={s.body}>
          <div className={s.important}>
            IT IS IMPORTANT THAT YOU CAREFULLY READ THE STAR TOKEN SALE TERMS
            AND CONDITIONS ATTACHED TO THIS ORDER, INCLUDING CERTAIN RISKS
            PERTAINING TO STARFLOW TECHNOLOGY PTE. LTD. AND THE TOKENS, BEFORE
            SUBMITTING YOUR ORDER.
          </div>
          <div className={s.scroll} onScroll={this.handleScroll.bind(this)}>
            <TermsAndConditions />
            <PrivacyPolicy />
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              closeTermsPopup();
              onAccepted();
            }}
          >
            <div className={s.checkbox}>
              <Field
                component={RenderCheckbox}
                label={
                  <span
                    className={
                      this.state.termsAndPolicyRead ? s.label : s.disabledLabel
                    }
                  >
                    I have read and understood, and agree to, the STAR Token
                    Sale Terms and Conditions and the Starflow Token Sale
                    Privacy Policy.{' '}
                  </span>
                }
                name="termsAccepted"
                disabled={!this.state.termsAndPolicyRead}
                onClick={this.handleTermsAccepted.bind(this)}
              />
            </div>
            <div className={s.checkbox}>
              <Field
                component={RenderCheckbox}
                label={
                  <span
                    className={
                      this.state.termsAndPolicyRead ? s.label : s.disabledLabel
                    }
                  >
                    I agree to the collection, use, and disclosure of my
                    personal data in accordance with the Starflow Token Sale
                    Privacy Policy.{' '}
                  </span>
                }
                name="policyAccepted"
                disabled={!this.state.termsAndPolicyRead}
                onClick={this.handlePolicyAccepted.bind(this)}
              />
            </div>
            <div className={s.checkbox}>
              <Field
                component={RenderCheckbox}
                label={
                  <span className={s.label}>
                    I agree to Starflow contacting me and sending me promotional
                    and marketing information by telephone call, SMS, fax, post
                    and email regarding (a) the Token Sale and any future sale
                    of STAR Tokens and/or (b) the Starflow platform, STAR Tokens
                    or other Starflow events, products and services.{' '}
                  </span>
                }
                name="agreedMarketing"
                onClick={this.handleAgreeMarketing.bind(this)}
              />
            </div>
            <div className={s.button}>
              <Button
                type="submit"
                bright
                disabled={
                  !(
                    this.state.termsAndPolicyRead &&
                    this.state.termsAccepted &&
                    this.state.policyAccepted &&
                    this.state.agreedMarketing
                  )
                }
              >
                Continue
              </Button>
            </div>
          </form>
        </div>
      </Popup>
    );
  }
}

export default connect(
  (state) => ({
    open: state.dashboard.buyTokens.termsPopupOpen,
  }),
  {
    closeTermsPopup,
  }
)(TermsPopup);
