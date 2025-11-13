import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MealsResponse } from '../models/meal.model';
import { Store } from '@ngrx/store';
@Injectable({
  providedIn: 'root',
})
export class MealService {
  private http = inject(HttpClient);
  private store = inject(Store);
    searchMeals(query: string) {
    return this.http.get<MealsResponse>(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
  }
}