import React, { Component } from 'react';
import { connect } from 'react-redux';
import s from './styles.css';

import { closeOrderFormPopup } from '../../../redux/modules/dashboard/buyTokens';

import Popup from '../../../components/common/Popup';
import Button from '../../../components/common/Button';
import OrderForm from './OrderForm';

class OrderFormPopup extends Component {
  constructor() {
    super();
    this.state = {
      orderRead: false,
    };
  }

  handleScroll({ target }) {
    if (target.scrollHeight - target.clientHeight === target.scrollTop) {
      this.setState({ orderRead: true });
    }
  }

  render() {
    const {
      open, closeOrderFormPopup, spinner, onAknowledged
    } = this.props;

    return (
      <Popup
        title="ORDER FOR STAR TOKENS"
        open={open}
        close={() => closeOrderFormPopup()}
        className="large-popup"
        hideCloseButton={true}
      >
        <div className={s.body}>
          <div className={s.important}>
            THE OFFER AND SALE OF THIS INSTRUMENT, THE RIGHTS HEREUNDER AND THE
            TOKENS ISSUABLE PURSUANT TO THIS INSTRUMENT HAVE NOT BEEN REGISTERED
            UNDER THE U.S. SECURITIES ACT OF 1933, AS AMENDED (THE “U.S.
            SECURITIES ACT”), OR UNDER THE SECURITIES LAWS OF ANY OTHER
            JURISDICTION. THIS INSTRUMENT, THE RIGHTS HEREUNDER AND THE TOKENS
            ISSUABLE PURSUANT TO THIS INSTRUMENT MAY NOT BE OFFERED, SOLD OR
            OTHERWISE TRANSFERRED, PLEDGED OR HYPOTHECATED EXCEPT (A) IN AN
            OFFSHORE RESALE TRANSACTION PERMITTED BY REGULATION S UNDER THE U.S.
            SECURITIES ACT, OR PURSUANT TO ANOTHER APPLICABLE EXEMPTION
            THEREFROM AND (B) IN ACCORDANCE WITH APPLICABLE LAWS AND REGULATIONS
            OF OTHER JURISDICTIONS. THIS INSTRUMENT, THE RIGHTS HEREUNDER AND
            THE TOKENS ISSUABLE PURSUANT TO THIS INSTRUMENT HAVE NOT BEEN
            APPROVED OR RECOMMENDED BY THE U.S. SECURITIES AND EXCHANGE
            COMMISSION OR ANY STATE OR INTERNATIONAL REGULATORY AUTHORITY NOR
            HAS THE U.S. SECURITIES AND EXCHANGE COMMISSION OR ANY U.S. STATE OR
            OTHER NON-U.S. REGULATORY AUTHORITY APPROVED THE OFFER AND SALE OF
            THIS INSTRUMENT, THE RIGHTS HEREUNDER AND THE TOKENS ISSUABLE
            PURSUANT TO THIS INSTRUMENT.
          </div>
          <div className={s.scroll} onScroll={this.handleScroll.bind(this)}>
            <OrderForm />
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              closeOrderFormPopup();
              onAknowledged();
            }}
          >
            <div className={s.button}>
              <Button
                type="submit"
                bright
                spinner={spinner}
                disabled={!this.state.orderRead}
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
    open: state.dashboard.buyTokens.orderFormPopupOpen,
    spinner: state.dashboard.buyTokens.spinner,
  }),
  {
    closeOrderFormPopup,
  }
)(OrderFormPopup);
