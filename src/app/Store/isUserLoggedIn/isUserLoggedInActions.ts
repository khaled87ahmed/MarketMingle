import { createAction, props } from '@ngrx/store';

export const updateUserFlag = createAction(
  'User Login',
  props<{ newValue: any }>()
);
