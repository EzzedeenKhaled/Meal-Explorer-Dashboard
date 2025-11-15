import { createReducer, on } from '@ngrx/store';
import { Meal } from '../models/meal.model';
import * as MealActions from './meals.actions';

// Define the state interface
export interface MealState {
  meals: Meal[];
  loading: boolean;
  error: any;
}

// Define initial custom meals
const defaultCustomMeals: Meal[] = [
  {
    idMeal: '1',
    strMeal: 'Pasta Carbonara',
    strCategory: 'Pasta',
    strInstructions: 'Cook spaghetti according to package directions. In a bowl, whisk eggs with parmesan cheese. Fry pancetta until crispy. Drain pasta and mix with pancetta, then remove from heat and stir in egg mixture quickly. Season with black pepper and serve immediately.',
    strYoutube: 'https://www.youtube.com/watch?v=CG1Yzk_F0P8',
    strMealThumb: 'https://www.simplyrecipes.com/thmb/t-7aHXGPfnNYZggxIrNQQwyhdHs=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Simply-Pasta-Carbonara-LEAD-1-c477cc25c7294cd9a3fc51ece176481f.jpg',
    isCustom: true
  },
  {
    idMeal: '2',
    strMeal: 'Grilled Chicken Salad',
    strCategory: 'Chicken',
    strInstructions: 'Season chicken breast with salt, pepper, and olive oil. Grill for 6-7 minutes per side until cooked through. Slice and serve over mixed greens with cherry tomatoes, cucumber, and your favorite dressing.',
    strYoutube: 'https://www.youtube.com/watch?v=oEk-3S8c_XY',
    strMealThumb: 'https://assets.epicurious.com/photos/64a845e67799ee8651e4fb8f/1:1/w_2240,c_limit/AshaGrilledChickenSalad_RECIPE_070523_56498.jpg',
    isCustom: true
  },
  {
    idMeal: '3',
    strMeal: 'Vegetarian Tacos',
    strCategory: 'Vegetarian',
    strInstructions: 'Heat black beans in a pan with cumin and chili powder. Warm corn tortillas. Fill with beans, diced tomatoes, shredded lettuce, avocado slices, and top with sour cream and cilantro. Serve with lime wedges.',
    strYoutube: 'https://www.youtube.com/watch?v=pvSL_VsLb4w',
    strMealThumb: 'https://www.connoisseurusveg.com/wp-content/uploads/2025/02/veggie-tacos-7.jpg',
    isCustom: true
  },
  {
    idMeal: '4',
    strMeal: 'Honey Garlic Salmon',
    strCategory: 'Seafood',
    strInstructions: 'Mix honey, soy sauce, minced garlic, and lemon juice. Place salmon fillets in a baking dish, pour sauce over them. Bake at 400°F for 15-20 minutes until salmon flakes easily. Garnish with sesame seeds and green onions.',
    strYoutube: 'https://www.youtube.com/watch?v=eiUs2YXFEZ4',
    strMealThumb: 'https://www.dinneratthezoo.com/wp-content/uploads/2018/01/honey-garlic-salmon-3.jpg',
    isCustom: true
  }
];

// Load custom meals from localStorage or use defaults
const storedCustomMeals = localStorage.getItem('customMeals');
let customMeals: Meal[];

if (!storedCustomMeals) {
  // First time - set default custom meals in localStorage
  customMeals = defaultCustomMeals;
  localStorage.setItem('customMeals', JSON.stringify(defaultCustomMeals));
} else {
  customMeals = JSON.parse(storedCustomMeals);
}

// Initial state
export const initialState: MealState = {
  meals: customMeals,
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

  // Load meals success - MERGE custom meals with API meals
  on(MealActions.loadMealsSuccess, (state, { meals }) => {
    // Get custom meals from localStorage
    const storedCustom = localStorage.getItem('customMeals');
    const customMeals = storedCustom ? JSON.parse(storedCustom) : [];
    
    // Merge API meals with custom meals (custom meals first)
    const allMeals = [...customMeals, ...(meals || [])];
    return {
      ...state,
      meals: allMeals,
      loading: false,
      error: meals.length === 0 && customMeals.length === 0 ? 'No meals found' : null
    };
  }),

  // Add meal
  on(MealActions.addCustomMeal, (state, { meal }) => {
    const updatedMeals = [meal, ...state.meals];
    const customMealsToSave = updatedMeals.filter(m => m.isCustom);
    localStorage.setItem('customMeals', JSON.stringify(customMealsToSave));
    return { ...state, meals: updatedMeals };
  }),

  // Update meal
  on(MealActions.updateCustomMeal, (state, { meal }) => {
    const updatedMeals = [
      meal,
      ...state.meals.filter(m => m.idMeal !== meal.idMeal)
    ];
    const customMealsToSave = updatedMeals.filter(m => m.isCustom);
    localStorage.setItem('customMeals', JSON.stringify(customMealsToSave));
    return { ...state, meals: updatedMeals };
  }),

  // Delete meal
  on(MealActions.deleteCustomMeal, (state, { id }) => {
    const updatedMeals = state.meals.filter(m => m.idMeal !== id);
    const customMealsToSave = updatedMeals.filter(m => m.isCustom);
    localStorage.setItem('customMeals', JSON.stringify(customMealsToSave));
    return { ...state, meals: updatedMeals };
  })
);