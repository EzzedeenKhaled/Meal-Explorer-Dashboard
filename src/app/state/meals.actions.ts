import { createAction, props } from '@ngrx/store';
import { Meal } from '../models/meal.model';


// Load meals actions
export const loadMeals = createAction(
  '[Meal] Load Meals',
  props<{ query: string }>()
);

// Load meals success
export const loadMealsSuccess = createAction(
  '[Meal] Load Meals Success',
  props<{ meals: Meal[] }>()
);

// Meal actions
export const addCustomMeal = createAction('[Meal] Add Custom Meal', props<{ meal: Meal }>());
export const updateCustomMeal = createAction('[Meal] Update Custom Meal', props<{ meal: Meal }>());
export const deleteCustomMeal = createAction('[Meal] Delete Custom Meal', props<{ id: string }>());

// Filter actions
export const filterByIngredient = createAction(
  '[Meals] Filter By Ingredient',
  props<{ ingredient: string }>()
);

export const filterByCategory = createAction(
  '[Meals] Filter By Category',
  props<{ category: string }>()
);

export const filterByArea = createAction(
  '[Meals] Filter By Area',
  props<{ area: string }>()
);