import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MealsResponse } from '../models/meal.model';
@Injectable({
  providedIn: 'root',
})
export class MealService {
  // Inject HttpClient
  private http = inject(HttpClient);
  // Base API URL, easier to use in methods
  private apiUrl = 'https://www.themealdb.com/api/json/v1/1';

  // Search meals by name
  searchMeals(query: string) {
    return this.http.get<MealsResponse>(`${this.apiUrl}/search.php?s=${query}`);
  }

  // Filter meals by ingredient
  filterByIngredient(ingredient: string) {
    return this.http.get<MealsResponse>(`${this.apiUrl}/filter.php?i=${ingredient}`);
  }

  // Filter meals by category
  filterByCategory(category: string) {
    return this.http.get<MealsResponse>(`${this.apiUrl}/filter.php?c=${category}`);
  }

  // Filter meals by area
  filterByArea(area: string) {
    return this.http.get<MealsResponse>(`${this.apiUrl}/filter.php?a=${area}`);
  }
}