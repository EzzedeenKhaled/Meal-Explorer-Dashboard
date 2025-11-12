import { Component, Input, OnInit } from '@angular/core';
import { Meal } from '../models/meal.model';
@Component({
selector: 'app-meal-card',
  imports: [],
  templateUrl: './meal-card.html',
  styleUrl: './meal-card.css',
})
export class MealCard implements OnInit {
  @Input() meal: Meal | undefined;

  ngOnInit() {
    console.log("djaioa");
  }
}
