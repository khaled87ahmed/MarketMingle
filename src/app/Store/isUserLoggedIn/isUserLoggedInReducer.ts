import { createReducer, on } from '@ngrx/store';
import { isUserLoggedIn } from './isUserLoggedInModel';
import { updateUserFlag } from './isUserLoggedInActions';

const initialState: isUserLoggedIn = {
  flag: localStorage.getItem('token') ? true : false,
};

export let isUserLoggedInReducer = createReducer(
  initialState,
  on(updateUserFlag, (state, { newValue }) => ({
    ...state,
    flag: newValue,
  }))
);
