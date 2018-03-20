import { all, takeLatest, call, put, fork, select } from 'redux-saga/effects';
import { reset, SubmissionError } from 'redux-form';
import notify from '../../utils/notifications';
import { post } from '../../utils/fetch';
import { NUMBER_REGEXP } from '../../utils/validators';

import {
  CHANGE_ETH,
  setEth,
  setMnemonic,
  initiateBuyTokens,
  openOrderFormPopup,
  verifyBuyTokens,
  resetStore
} from '../../redux/modules/dashboard/buyTokens';

/**
 * Change eth
 */

function* changeEthIterator({ payload }) {
  if (NUMBER_REGEXP.test(payload)) {
    yield put(setEth(payload));
  }
}

function* changeEthSaga() {
  yield takeLatest(
    CHANGE_ETH,
    changeEthIterator
  );
}

/**
 * Initiate buy tokens
 */

function* initiateBuyTokensIterator({ payload }) {
  try {
    yield put(setMnemonic(payload.mnemonic));
    const data = yield call(post, '/dashboard/invest/initiate', payload);
    yield put(initiateBuyTokens.success(data.verification));
  } catch (e) {
    yield put(initiateBuyTokens.failure(new SubmissionError({ _error: e.error })));
  }
}

function* initiateBuyTokensSaga() {
  yield takeLatest(
    initiateBuyTokens.REQUEST,
    initiateBuyTokensIterator
  );
}

/**
 * Fetch transactions count
 */

const getEthAddress = (state) => state.app.app.user.ethAddress;

function* fetchTransactionsCountIterator() {
  try {
    const ethAddress = yield select(getEthAddress);
    console.log('!!! ETH_ADDRESS', ethAddress);
    yield put(openOrderFormPopup.success());
  } catch (e) {
    yield put(openOrderFormPopup.failure(new SubmissionError({ _error: e.error })));
  }
}

function* fetchTransactionsCountSaga() {
  yield takeLatest(
    openOrderFormPopup.REQUEST,
    fetchTransactionsCountIterator
  );
}

/**
 * Verify buy tokens
 */

function* verifyBuyTokensIterator({ payload }) {
  try {
    yield call(post, '/dashboard/invest/verify', payload);
    yield put(notify('success', 'Success! Go to Transactions to check the status'));
    yield put(verifyBuyTokens.success());
    yield put(resetStore());
    yield put(reset('buyTokens'));
  } catch (e) {
    yield put(verifyBuyTokens.failure(new SubmissionError({ _error: e.error })));
  }
}

function* verifyBuyTokensSaga() {
  yield takeLatest(
    verifyBuyTokens.REQUEST,
    verifyBuyTokensIterator
  );
}

/**
 * Export
 */

export default function* () {
  yield all([
    fork(changeEthSaga),
    fork(initiateBuyTokensSaga),
    fork(verifyBuyTokensSaga),
    fork(fetchTransactionsCountSaga)
  ]);
}
