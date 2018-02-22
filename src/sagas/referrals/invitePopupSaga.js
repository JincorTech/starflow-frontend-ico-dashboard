import { all, takeLatest, call, put, fork, select } from 'redux-saga/effects';
import notify from '../../utils/notifications';
import { post } from '../../utils/fetch';
import { isEmail } from '../../helpers/common/emailsInput';

import { inviteUsers } from '../../redux/modules/referrals/invitePopup';
import { resetTextarea } from '../../redux/modules/common/emailsInput';

/**
 * Invite users saga
 */

const getEmails = (state) => state.common.emailsInput;

function* inviteUsersIterator() {
  const { value, emails: selectedEmails } = yield select(getEmails);
  const emails = isEmail(value) ? [...selectedEmails, value] : selectedEmails;

  try {
    yield call(post, '/user/invite', { emails });
    yield put(inviteUsers.success());
    yield put(resetTextarea());
    yield put(notify('success', 'Users invited!'));
  } catch (e) {
    yield put(inviteUsers.failure(e));
    yield put(notify('error', e.error));
  }
}

function* inviteUsersSaga() {
  yield takeLatest(
    inviteUsers.REQUEST,
    inviteUsersIterator
  );
}

/**
 * Export
 */

export default function* () {
  yield all([
    fork(inviteUsersSaga)
  ]);
}
