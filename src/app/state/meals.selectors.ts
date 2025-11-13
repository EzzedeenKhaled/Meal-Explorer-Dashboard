import { createSelector, createFeatureSelector } from '@ngrx/store';
import { MealState } from './meals.reducer';

export const selectMealState = createFeatureSelector<MealState>('meals');

export const selectAllMeals = createSelector(
  selectMealState,
  (state: MealState) => state.meals
);

export const selectMealsLoading = createSelector(
  selectMealState,
  (state) => state.loading
);
