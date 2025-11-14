import { Component, Inject } from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Meal } from '../models/meal.model';
import { inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
@Component({
  selector: 'app-meal-dialog',
  templateUrl: './meal-dialog.html',
  imports: [MatIcon],
  styleUrls: ['./meal-dialog.css']
})
export class MealDialog {
  private dialogRef = inject(DialogRef);
  constructor(
    @Inject(DIALOG_DATA) public meal: Meal, // Inject the passed data
  ) {}

  close() {
    this.dialogRef.close();
  }

  // Method to open the YouTube tutorial link in a new tab
  openTutorial() {
    const tutorialUrl = this.meal.strYoutube;
    window.open(tutorialUrl, '_blank');
  }

}
