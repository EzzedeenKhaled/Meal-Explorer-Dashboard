import { Routes } from '@angular/router';
import { MealHome } from './meal-home/meal-home';
export const routes: Routes = [
    { path: '', component: MealHome, pathMatch: 'full' }
];
