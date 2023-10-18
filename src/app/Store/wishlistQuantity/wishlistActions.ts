import { createAction, props } from '@ngrx/store';

export const updateWishlistCounter = createAction(
  'Wishlist Update',
  props<{ newValue: any }>()
);
