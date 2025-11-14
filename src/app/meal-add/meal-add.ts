import { Component, inject } from '@angular/core';
import { DialogRef } from '@angular/cdk/dialog';
import { Store } from '@ngrx/store';
import { Meal } from '../models/meal.model';
import * as MealActions from '../state/meals.actions';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-meal-add',
  imports: [FormsModule, CommonModule],
  templateUrl: './meal-add.html',
  styleUrl: './meal-add.css',
})
export class MealAdd {
  private dialogRef = inject(DialogRef);
  private store = inject(Store);

  // Form object to bind to inputs
  meal: Meal = {
    idMeal: Date.now().toString(), // Generate a unique ID based on timestamp
    strMeal: "",
    strCategory: "",
    strInstructions: "",
    strYoutube: "",
    strMealThumb: ""
  };

  // Method to add a new meal
  add(newMeal: Meal) {
    this.store.dispatch(MealActions.addCustomMeal({ meal: newMeal }));
    this.dialogRef.close();
  }
  cancel() {
    this.dialogRef.close();
  }
}
