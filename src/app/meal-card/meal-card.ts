import { Component, Input, inject } from '@angular/core';
import { Meal } from '../models/meal.model';
import { Dialog } from '@angular/cdk/dialog';
import { ConfirmDialog } from '../confirm-dialog/confirm-dialog';
import { MealDialog } from '../meal-dialog/meal-dialog';
import { MealEdit } from '../meal-edit/meal-edit';
@Component({
  selector: 'app-meal-card',
  templateUrl: './meal-card.html',
  styleUrls: ['./meal-card.css'],
})
export class MealCard {
  // Input property to receive meal data
  @Input() meal: Meal | undefined;

  private dialog = inject(Dialog);

  // Method to open the meal detail dialog and pass the meal data
  openMealDialog() {
    this.dialog.open(MealDialog, {
      data: this.meal,
    });
  }

  // Method to open the delete confirmation dialog with meal id
  deleteMeal(idMeal: string | undefined) {
    this.dialog.open(ConfirmDialog, {
      data: idMeal,
    });
  }

  // Method to open the edit meal dialog with meal data
  openEditDialog(meal: Meal | undefined) {
    this.dialog.open(MealEdit, {
      data: meal,
    });
  }
}