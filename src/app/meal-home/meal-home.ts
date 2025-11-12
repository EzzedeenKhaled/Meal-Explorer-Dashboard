import { Component, inject, OnInit, signal } from '@angular/core';
import { MealService } from '../services/meal-service';
import { MealCard } from '../meal-card/meal-card';
import { MatIconModule } from '@angular/material/icon';
import { Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { Meal } from '../models/meal.model';
@Component({
  selector: 'app-meal-home',
  imports: [MealCard, MatIconModule, CommonModule],
  templateUrl: './meal-home.html',
  styleUrl: './meal-home.css',
})
export class MealHome implements OnInit {
  private mealService = inject(MealService);
  private titleService = inject(Title);

  meals= signal<Meal[]>([]); // signal to hold the list of meals

  ngOnInit() {
    this.titleService.setTitle('Meal Explorer Dashboard');
    this.mealService.getMeals().subscribe((response) => {
      this.meals.set(response.meals); // update the signal with fetched meals
    });
  }
}
