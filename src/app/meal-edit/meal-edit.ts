import { Component, inject, Inject } from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import * as MealActions from '../state/meals.actions';
import { Store } from '@ngrx/store';
import { Meal } from '../models/meal.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-meal-edit',
  imports: [FormsModule],
  templateUrl: './meal-edit.html',
  styleUrl: './meal-edit.css',
})
export class MealEdit {
  // Dependency injections
  private dialogRef = inject(DialogRef);
  private store = inject(Store);

  // @Inject DIALOG_DATA to get the meal being edited which is passed from card component template
  constructor(@Inject(DIALOG_DATA) public meal: Meal) {
    // Initialize form with a copy of meal
    this.mealForm = { ...meal }; // Making a copy to bind to the form and to send it as the updated meal
  }

  // Form object to bind to inputs
  mealForm: Meal;

  // Method to update the meal
  update() {
    // Dispatch updated meal
    this.store.dispatch(MealActions.updateCustomMeal({ meal: this.mealForm }));
    this.dialogRef.close();
  }
  
  // Close dialog
  cancel() {
    this.dialogRef.close();
  }
}
