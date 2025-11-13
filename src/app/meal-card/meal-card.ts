import { Component, Input, inject } from '@angular/core';
import { Meal } from '../models/meal.model';
import { Dialog } from '@angular/cdk/dialog';
import { ConfirmDialog } from '../confirm-dialog/confirm-dialog';
import { MealDialog } from '../meal-dialog/meal-dialog';
@Component({
  selector: 'app-meal-card',
  templateUrl: './meal-card.html',
  styleUrls: ['./meal-card.css'],
})
export class MealCard {
  @Input() meal: Meal | undefined;

  private dialog = inject(Dialog);

  openMealDialog() {
    this.dialog.open(MealDialog, {
      data: this.meal,
    });
  }

deleteMeal(idMeal: string | undefined) {
  this.dialog.open(ConfirmDialog, {
    data: idMeal,
  });
}

}
