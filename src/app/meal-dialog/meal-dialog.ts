import { Component, Inject } from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Meal } from '../models/meal.model';
import { inject } from '@angular/core';
@Component({
  selector: 'app-meal-dialog',
  templateUrl: './meal-dialog.html',
  styleUrls: ['./meal-dialog.css']
})
export class MealDialog {
  private dialogRef = inject(DialogRef);
  constructor(
    @Inject(DIALOG_DATA) public meal: Meal,      // Inject the passed data
  ) {}

  close() {
    this.dialogRef.close();
  }
}
