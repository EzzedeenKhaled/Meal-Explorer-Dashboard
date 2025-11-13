import * as fromMeals from './meals.reducer';
import { selectMealsState } from './meals.selectors';

describe('Meals Selectors', () => {
  it('should select the feature state', () => {
    const result = selectMealsState({
      [fromMeals.mealsFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
