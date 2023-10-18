import { createAction, props } from '@ngrx/store';

export const updateSearchValue = createAction(
  'Search Update',
  props<{ newValue: any }>()
);
