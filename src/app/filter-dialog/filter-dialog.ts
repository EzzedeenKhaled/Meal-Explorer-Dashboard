import { Component, OnInit, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DialogRef } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as MealActions from '../state/meals.actions';

@Component({
  standalone: true,
  selector: 'app-filter-dialog',
  imports: [CommonModule, FormsModule],
  templateUrl: './filter-dialog.html',
  styleUrl: './filter-dialog.css',
})
export class FilterDialog implements OnInit {
  // Dependency injections
  private http = inject(HttpClient);
  private store = inject(Store);
  private dialogRef = inject(DialogRef);

  // Use signals for reactive arrays, becuase I used before just a property array it was not updating the view directly
  ingredients = signal<string[]>([]);
  categories = signal<string[]>([]);
  areas = signal<string[]>([]);

  // Selected filter values
  selectedIngredient = '';
  selectedCategory = '';
  selectedArea = '';

  // OnInit lifecycle hook to load filter options
  ngOnInit() {
    // Load ingredients
    this.http
      .get<any>('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
      .subscribe(res => this.ingredients.set(res.meals?.map((m: any) => m.strIngredient) || []));

    // Load categories
    this.http
      .get<any>('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
      .subscribe(res => this.categories.set(res.meals?.map((m: any) => m.strCategory) || []));

    // Load areas
    this.http
      .get<any>('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
      .subscribe(res => this.areas.set(res.meals?.map((m: any) => m.strArea) || []));
  }

  // Method to apply the selected filters
  apply() {
    if (this.selectedIngredient) {
      this.store.dispatch(MealActions.filterByIngredient({ ingredient: this.selectedIngredient }));
    } else if (this.selectedCategory) {
      this.store.dispatch(MealActions.filterByCategory({ category: this.selectedCategory }));
    } else if (this.selectedArea) {
      this.store.dispatch(MealActions.filterByArea({ area: this.selectedArea }));
    }

    this.dialogRef.close();
  }

  close() {
    this.dialogRef.close();
  }
}
