import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealHome } from './meal-home';

describe('MealHome', () => {
  let component: MealHome;
  let fixture: ComponentFixture<MealHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MealHome]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MealHome);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
