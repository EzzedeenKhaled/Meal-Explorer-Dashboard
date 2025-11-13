import { createReducer, on } from '@ngrx/store';
import { Meal } from '../models/meal.model';
import * as MealActions from './meals.actions';

export interface MealState {
  meals: Meal[];     
  loading: boolean;
  error: any;
}

const storedCustomMeals = JSON.parse(localStorage.getItem('customMeals') || '[]');

export const initialState: MealState = {
  meals: storedCustomMeals,
  loading: false,
  error: null
};

export const mealReducer = createReducer(
  initialState,
  
  on(MealActions.loadMeals, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

on(MealActions.loadMealsSuccess, (state, { meals }) => ({
  ...state,
  meals: meals || [],
  loading: false
})),
  on(MealActions.loadMealsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(MealActions.addCustomMeal, (state, { meal }) => {
    const updatedMeals = [...state.meals, meal];
    localStorage.setItem('customMeals', JSON.stringify(updatedMeals));
    return { ...state, meals: updatedMeals };
  }),
  
  on(MealActions.updateCustomMeal, (state, { meal }) => {
    const updatedMeals = state.meals.map(m => m.idMeal === meal.idMeal ? meal : m);
    localStorage.setItem('customMeals', JSON.stringify(updatedMeals));
    return { ...state, meals: updatedMeals };
  }),
  
  on(MealActions.deleteCustomMeal, (state, { id }) => {
    const updatedMeals = state.meals.filter(m => m.idMeal !== id);
    localStorage.setItem('customMeals', JSON.stringify(updatedMeals));
    return { ...state, meals: updatedMeals };
  })
);
