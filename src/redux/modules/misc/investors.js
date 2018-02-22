import { from } from 'seamless-immutable';
import { createReducer, createAsyncAction } from '../../../utils/actions';

export const FETCH_INVESTORS = 'misc/investors/FETCH_INVESTORS';

export const fetchInvestors = createAsyncAction(FETCH_INVESTORS);

const initialState = from({
  investors: [],
});

export default createReducer({
  [fetchInvestors.SUCCESS]: (state, { payload }) => (
    state.merge({
      ...payload
    })
  )
}, initialState);
