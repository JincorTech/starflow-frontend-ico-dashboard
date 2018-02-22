import { all, takeLatest, call, put, fork } from 'redux-saga/effects';
import { get } from '../../utils/fetch';

import { fetchInvestors } from '../../redux/modules/misc/investors';

/**
 * Fetch Investors
 */

function* fetchInvestorsIterator() {
  try {
    const data = yield call(get, '/misc/investors');

    const body = {
      ...data
    };

    yield put(fetchInvestors.success(body));
  } catch (e) {
    yield put(fetchInvestors.failure(e));
  }
}

function* fetchInvestorsSaga() {
  yield takeLatest(
    fetchInvestors.REQUEST,
    fetchInvestorsIterator
  );
}

/**
 * Export
 */

export default function* () {
  yield all([
    fork(fetchInvestorsSaga)
  ]);
}
