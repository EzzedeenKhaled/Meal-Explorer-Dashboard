import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealDialog } from './meal-dialog';

describe('MealDialog', () => {
  let component: MealDialog;
  let fixture: ComponentFixture<MealDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MealDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MealDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
