import { createSelector, createFeatureSelector } from '@ngrx/store';
import { MealState } from './meals.reducer';

// Feature selector for meals state
export const selectMealState = createFeatureSelector<MealState>('meals');

// Selector to get all meals
export const selectAllMeals = createSelector(
  selectMealState,
  (state: MealState) => state.meals
);

// Selector to get loading status
export const selectMealsLoading = createSelector(
  selectMealState,
  (state) => state.loading
);

// Selector to get error message
export const selectMealsError = createSelector(
  selectMealState,
  (state: MealState) => state.error
);

