import { createAction, props } from '@ngrx/store';
import { Meal } from '../models/meal.model';

export const loadMeals = createAction(
  '[Meal] Load Meals',
  props<{ query: string }>()
);

export const loadMealsSuccess = createAction(
  '[Meal] Load Meals Success',
  props<{ meals: Meal[] }>()
);

export const loadMealsFailure = createAction(
  '[Meal] Load Meals Failure',
  props<{ error: string }>()
);

export const addCustomMeal = createAction('[Meal] Add Custom Meal', props<{ meal: Meal }>());
export const updateCustomMeal = createAction('[Meal] Update Custom Meal', props<{ meal: Meal }>());
export const deleteCustomMeal = createAction('[Meal] Delete Custom Meal', props<{ id: string }>());