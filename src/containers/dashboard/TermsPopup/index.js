import React, { Component } from 'react';
import { Field } from 'redux-form';
import { connect } from 'react-redux';
import s from './styles.css';

import { closeTermsPopup } from '../../../redux/modules/dashboard/buyTokens';

import Popup from '../../../components/common/Popup';
import RenderCheckbox from '../../../components/forms/RenderCheckbox';
import Button from '../../../components/common/Button';
import TermsAndConditions from './TermsAndConditions';

class TermsPopup extends Component {
  constructor() {
    super();
    this.state = {
      termsRead: false,
      termsAccepted: false,
    };
  }

  handleScroll({ target }) {
    if (target.scrollHeight - target.clientHeight === target.scrollTop) {
      this.setState({ termsRead: true });
    }
  }
  handleTermsAccepted({ target }) {
    this.setState({ termsAccepted: target.checked });
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
                    className={this.state.termsRead ? s.label : s.disabledLabel}
                  >
                    I have read and understood, and agree to, the STAR Token
                    Sale Terms and Conditions.{' '}
                  </span>
                }
                name="termsAccepted"
                disabled={!this.state.termsRead}
                onClick={this.handleTermsAccepted.bind(this)}
              />
            </div>
            <div className={s.button}>
              <Button
                type="submit"
                bright
                disabled={!this.state.termsRead || !this.state.termsAccepted}
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
