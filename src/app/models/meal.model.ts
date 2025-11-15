// Meal model, good for intellisense and type checking
export interface Meal {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strInstructions: string;
  strYoutube: string;
  strMealThumb: string;
  isCustom: boolean; 
}

// Wrapper for the API response
export interface MealsResponse {
  meals: Meal[];
}
