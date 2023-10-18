import { createAction, props } from '@ngrx/store';

export const updateCartCounter = createAction(
  'Cart Update',
  props<{ newValue: any }>()
);
