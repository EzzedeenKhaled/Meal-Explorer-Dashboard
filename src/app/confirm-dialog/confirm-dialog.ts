import { Component, inject, Inject } from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import * as MealActions from '../state/meals.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.html',
  styleUrl: './confirm-dialog.css' 
})
export class ConfirmDialog {
  private dialogRef = inject(DialogRef);
  private store = inject(Store);
  constructor(
    @Inject(DIALOG_DATA) public idMeal: string, 
  ) {}
  confirm() {
     if (this.idMeal) {
      this.store.dispatch(MealActions.deleteCustomMeal({ id: this.idMeal }));
    }
    this.dialogRef.close();
  }

  cancel() {
    this.dialogRef.close();
  }
}
