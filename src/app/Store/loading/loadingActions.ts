import { createAction, props } from '@ngrx/store';

export const updateLoading = createAction(
  'Loading Update',
  props<{ newValue: any }>()
);
