import { test, expect } from '@playwright/test';

// Basic test to check if the title is correct
test('has title', async ({ page }) => {
  await page.goto('/', { waitUntil: 'load' });
  await expect(page).toHaveTitle("Meal Explorer Dashboard");
});

// Check if meals are displayed
test('displays meals', async ({ page }) => {
  await page.goto('/', { waitUntil: 'load' });

  // Wait for meals to load
  await page.waitForSelector('app-meal-card');

  const mealItemsCount = await page.locator('.meals-grid app-meal-card').count();
  expect(mealItemsCount).toBeGreaterThan(0);
});

// Check search functionality
test('searches for meals', async ({ page }) => {
  await page.goto('/', { waitUntil: 'load' });

  const searchInput = page.locator('input[placeholder="Search for meals..."]');
  await searchInput.fill('Chicken');
  await searchInput.press('Enter');

  // wait for search results to load
  await page.waitForTimeout(3000);

  const mealItemsCount = await page.locator('.meals-grid app-meal-card').count();
  expect(mealItemsCount).toBeGreaterThan(0);
});

// Delete meal functionality
test('deletes a meal by id', async ({ page }) => {
  await page.goto('/', { waitUntil: 'load' });

  await page.waitForSelector('app-meal-card');

  const firstMealCard = page.locator('.meals-grid app-meal-card').first();
  const mealId = await firstMealCard.getAttribute('id');

  const deleteButton = firstMealCard.locator('button.delete-button');
  await deleteButton.click();

  await page.click('button:has-text("Confirm")');

  // Wait for deletion using attribute selector
  await page.waitForSelector(`[id="${mealId}"]`, { state: 'detached' });

  // Verify the card no longer exists
  const deletedMeal = page.locator(`[id="${mealId}"]`);
  await expect(deletedMeal).toHaveCount(0);
});

// edit meal functionality
test('edits a meal by id', async ({ page }) => {
  await page.goto('/');

  // Wait for meals to load
  await page.waitForSelector('app-meal-card');

  // Get the first meal card
  const firstMealCard = page.locator('.meals-grid app-meal-card').first();
  
  // Get the meal id
  const mealId = await firstMealCard.getAttribute('id');

  // Get current name
  const oldName = await firstMealCard.locator('p').first().textContent();

  // Click edit button
  await firstMealCard.locator('button:has-text("Edit")').click();

  // Wait for the edit dialog
  const dialog = page.locator('.dialog-container');
  await expect(dialog).toBeVisible();

  // Change the name
  const newName = oldName + ' Updated';
  const nameInput = dialog.locator('input[type="text"]').first();
  await nameInput.fill(newName);


  // Click Update
  await dialog.locator('button:has-text("Update")').click();

  // Wait for dialog to close
  await expect(dialog).toBeHidden();

  // Verify the meal card name is updated
  const updatedCard = page.locator(`[id="${mealId}"]`);
  const updatedName = await updatedCard.locator('p').first().textContent();
  expect(updatedName).toBe(newName);
});


// Add meal functionality
test('adds a new meal', async ({ page }) => {
  await page.goto('/', { waitUntil: 'load' });

  // Click the Add Meal button
  await page.click('button:has-text("+ Add New Meal")');

  // Wait for the add meal dialog
  const dialog = page.locator('.meal-add-container');
  await expect(dialog).toBeVisible();

  // Fill in meal details
  await dialog.locator('#strMeal').fill('Test Meal');
  await dialog.locator('#strCategory').fill('Test Category');
  await dialog.locator('#strInstructions').fill('Test Instructions');
  await dialog.locator('#strYoutube').fill('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
  await dialog.locator('#strMealThumb').fill('https://www.themealdb.com/images/media/meals/llcbn01574260722.jpg');

  // Click Add Meal
  await dialog.locator('button:has-text("Add Meal")').click();

  // Wait for dialog to close
  await expect(dialog).toBeHidden();

  // Wait for the new meal to appear in the list
  const newMeal = page.locator('.meals-grid app-meal-card p', { hasText: 'Test Meal' });
  await expect(newMeal).toBeVisible({ timeout: 5000 }); // waits up to 5s
});
