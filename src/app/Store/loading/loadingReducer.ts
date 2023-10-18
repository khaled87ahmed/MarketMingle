import { createReducer, on } from '@ngrx/store';
import { Loading } from './loadingModel';
import { updateLoading } from './loadingActions';

const initialState: Loading = {
  flag: false,
};

export let loadingReducer = createReducer(
  initialState,
  on(updateLoading, (state, { newValue }) => ({
    ...state,
    flag: newValue,
  }))
);
