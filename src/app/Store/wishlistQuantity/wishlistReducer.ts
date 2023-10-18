import { createReducer, on } from '@ngrx/store';
import { Wishlist } from './wishlistModel';
import { updateWishlistCounter } from './wishlistActions';

const initialState: Wishlist = {
  counter: 0,
};

export let wishlistReducer = createReducer(
  initialState,
  on(updateWishlistCounter, (state, { newValue }) => ({
    ...state,
    counter: newValue,
  }))
);
