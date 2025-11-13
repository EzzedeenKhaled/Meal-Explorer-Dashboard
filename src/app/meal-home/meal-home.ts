import { Component, inject, OnInit } from '@angular/core';
import { MealCard } from '../meal-card/meal-card';
import { MatIconModule } from '@angular/material/icon';
import { Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Dialog } from '@angular/cdk/dialog';
import { Store } from '@ngrx/store';
import { selectMealsLoading, selectAllMeals } from '../state/meals.selectors';
import { loadMeals } from '../state/meals.actions'; 

@Component({
  selector: 'app-meal-home',
  standalone: true,
  imports: [MealCard, MatIconModule, CommonModule, FormsModule],
  templateUrl: './meal-home.html',
  styleUrl: './meal-home.css',
})
export class MealHome implements OnInit {
  private titleService = inject(Title);
  private store = inject(Store);
  private dialog = inject(Dialog);

  loading$ = this.store.select(selectMealsLoading); // from store
  searchQuery = 'pancake'; // default search query
  meals$ = this.store.select(selectAllMeals);
  ngOnInit() {
    this.titleService.setTitle('Meal Explorer Dashboard');
    this.loadMeals();
  }

  loadMeals() {
    this.store.dispatch(loadMeals({ query: this.searchQuery }));
  }

  openAddDialog() {
    this.dialog.open(MealCard);
  }
}
