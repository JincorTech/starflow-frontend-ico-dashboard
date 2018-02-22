import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import s from './styles.css';

import { required } from '../../../utils/validators';

import { closeMnemonicPopup, initiateSendTokens } from '../../../redux/modules/sendTokens/sendTokens';

import Popup from '../../../components/common/Popup';
import RenderPassword from '../../../components/forms/RenderPassword';
import RenderInput from '../../../components/forms/RenderInput';
import Button from '../../../components/common/Button';

class MnemonicPopup extends Component {
  // componentWillReceiveProps(nextProps) {
  //   const { change, open, eth } = nextProps;
  //   if (open && eth) {
  //     change('ethAmount', eth);
  //   }
  // }

  render() {
    const {
      open,
      handleSubmit,
      closeMnemonicPopup,
      spinner,
      invalid,
      error
    } = this.props;

    return (
      <Popup
        title="Enter your mnemonic phrase"
        open={open}
        close={() => closeMnemonicPopup()}>

        <div className={s.body}>
          {error && <div className={s.error}>{error}</div>}

          <form onSubmit={handleSubmit(initiateSendTokens)}>
            <div className={s.field}>
              <Field
                component={RenderPassword}
                name="mnemonic"
                placeholder="Mnemonic phrase"
                validate={required}/>
            </div>

            <Field
              component={RenderInput}
              name="ethAmount"
              type="hidden"/>

            <div className={s.button}>
              <Button type="submit" spinner={spinner} disabled={invalid}>Send</Button>
            </div>
          </form>
        </div>

      </Popup>
    );
  }
}

const FormComponent = reduxForm({
  form: 'sendTokensMnemonic',
  initialValues: {
    mnemonic: '',
    ethAmount: 0
  }
})(MnemonicPopup);

export default connect(
  (state) => ({
    open: state.sendTokens.sendTokens.mnemonicPopupOpen,
    spinner: state.sendTokens.sendTokens.spinner,
    eth: state.sendTokens.sendTokens.eth
  }),
  {
    closeMnemonicPopup
  }
)(FormComponent);
