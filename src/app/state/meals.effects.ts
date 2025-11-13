import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MealService } from '../services/meal-service';
import * as MealActions from './meals.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class MealsEffects {
  private actions$ = inject(Actions);
  private mealService = inject(MealService);

  loadMeals$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MealActions.loadMeals),
      mergeMap(action =>
        this.mealService.searchMeals(action.query).pipe(
          map(response => MealActions.loadMealsSuccess({ meals: response.meals || [] })),
          catchError(err => of(MealActions.loadMealsFailure({ error: err.message || err })))
        )
      )
    )
  );
}

