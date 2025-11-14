import { createReducer, on } from '@ngrx/store';
import { Meal } from '../models/meal.model';
import * as MealActions from './meals.actions';

// Define the state interface
export interface MealState {
  meals: Meal[];
  loading: boolean;
  error: any;
}

// Load custom meals from localStorage
const storedCustomMeals = JSON.parse(localStorage.getItem('customMeals') || '[]');

// Initial state
export const initialState: MealState = {
  meals: storedCustomMeals,
  loading: false,
  error: null
};

// Create the reducer
export const mealReducer = createReducer(
  initialState,

  // Load meals actions
  on(MealActions.loadMeals, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  // Load meals success
  on(MealActions.loadMealsSuccess, (state, { meals }) => ({
    ...state,
    meals: meals || [],
    loading: false,
    error: meals.length === 0 ? 'No meals found' : null
  })),

  // Add meal
  on(MealActions.addCustomMeal, (state, { meal }) => {
    const updatedMeals = [meal, ...state.meals];
    localStorage.setItem('customMeals', JSON.stringify(updatedMeals));
    return { ...state, meals: updatedMeals };
  }),

  // Update meal
  on(MealActions.updateCustomMeal, (state, { meal }) => {
    const updatedMeals = [
      meal,
      ...state.meals.filter(m => m.idMeal !== meal.idMeal)
    ];
    localStorage.setItem('customMeals', JSON.stringify(updatedMeals));
    return { ...state, meals: updatedMeals };
  }),

  // Delete meal
  on(MealActions.deleteCustomMeal, (state, { id }) => {
    const updatedMeals = state.meals.filter(m => m.idMeal !== id);
    localStorage.setItem('customMeals', JSON.stringify(updatedMeals));
    return { ...state, meals: updatedMeals };
  })
);
