import { Component, inject, OnInit } from '@angular/core';
import { MealCard } from '../meal-card/meal-card';
import { MatIconModule } from '@angular/material/icon';
import { Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Dialog } from '@angular/cdk/dialog';
import { Store } from '@ngrx/store';
import { selectMealsLoading, selectAllMeals, selectMealsError } from '../state/meals.selectors';
import { loadMeals } from '../state/meals.actions'; 
import { MealAdd } from '../meal-add/meal-add';
import { FilterDialog } from '../filter-dialog/filter-dialog';
@Component({
  selector: 'app-meal-home',
  standalone: true,
  imports: [MealCard, MatIconModule, CommonModule, FormsModule],
  templateUrl: './meal-home.html',
  styleUrl: './meal-home.css',
})
export class MealHome implements OnInit {
  // Dependency injections
  private titleService = inject(Title); // To set the page title
  private store = inject(Store); // NgRx Store for state management
  private dialog = inject(Dialog); // To open dialogs

  // Observables for meals state ($ suffix indicates observable)

  loading$ = this.store.select(selectMealsLoading);
  meals$ = this.store.select(selectAllMeals);
  error$ = this.store.select(selectMealsError); 
  searchQuery = ''; // default search query

  // Lifecycle hook to initialize the component
  ngOnInit() {
    this.titleService.setTitle('Meal Explorer Dashboard');
    this.loadMeals();
  }

  // dispatch action to load meals based on the search query
  loadMeals() {
    this.store.dispatch(loadMeals({ query: this.searchQuery }));
  }

  // Method to open the add meal dialog
  openAddDialog() {
    this.dialog.open(MealAdd);
  }

  // Method to open the filter dialog
  openFilterDialog() {
    this.dialog.open(FilterDialog);
  }
}
