import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MealService } from '../services/meal-service';
import * as MealActions from './meals.actions';
import { map, mergeMap } from 'rxjs';

@Injectable()
export class MealsEffects {
  private actions$ = inject(Actions);
  private mealService = inject(MealService);

  // Load meals
  loadMeals$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MealActions.loadMeals),
      mergeMap(action =>
        this.mealService.searchMeals(action.query).pipe(
          map(response => MealActions.loadMealsSuccess({ meals: response.meals || [] }))
        )
      )
    )
  );

   // Filter by ingredient
  filterByIngredient$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MealActions.filterByIngredient),
      mergeMap(action =>
        this.mealService.filterByIngredient(action.ingredient).pipe(
          map(response =>
            MealActions.loadMealsSuccess({ meals: response.meals || [] })
          )
        )
      )
    )
  );

  // Filter by category
  filterByCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MealActions.filterByCategory),
      mergeMap(action =>
        this.mealService.filterByCategory(action.category).pipe(
          map(response =>
            MealActions.loadMealsSuccess({ meals: response.meals || [] })
          )
        )
      )
    )
  );

  // Filter by area
  filterByArea$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MealActions.filterByArea),
      mergeMap(action =>
        this.mealService.filterByArea(action.area).pipe(
          map(response =>
            MealActions.loadMealsSuccess({ meals: response.meals || [] })
          )
        )
      )
    )
  );
}