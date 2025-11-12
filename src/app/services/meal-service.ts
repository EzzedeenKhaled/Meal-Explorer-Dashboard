import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MealsResponse } from '../models/meal.model';
@Injectable({
  providedIn: 'root',
})
export class MealService {
  private http = inject(HttpClient);
  getMeals() {
    return this.http.get<MealsResponse>('https://www.themealdb.com/api/json/v1/1/search.php?f=a');
  }
}