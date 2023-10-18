import { createReducer, on } from '@ngrx/store';
import { Search } from './searchedValueModel';
import { updateSearchValue } from './searchedValueActions';

const initialState: Search = {
  value: '',
};

export let searchReducer = createReducer(
  initialState,
  on(updateSearchValue, (state, { newValue }) => ({
    ...state,
    value: newValue,
  }))
);
