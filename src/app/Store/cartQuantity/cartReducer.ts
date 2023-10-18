import { createReducer, on } from '@ngrx/store';
import { Cart } from './cartModel';
import { updateCartCounter } from './cartActions';

const initialState: Cart = {
  counter: 0,
};

export let cartReducer = createReducer(
  initialState,
  on(updateCartCounter, (state, { newValue }) => ({
    ...state,
    counter: newValue,
  }))
);
