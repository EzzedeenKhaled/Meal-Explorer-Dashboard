export interface Meal {
  strMeal: string;
  strMealThumb: string;
}

// Wrapper for the API response
export interface MealsResponse {
  meals: Meal[];
}
