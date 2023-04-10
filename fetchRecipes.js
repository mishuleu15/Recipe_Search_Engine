import { addRecipeToPage, hideSpinner, showNoResultsMessage } from './utils.js';

import { filterData } from './filterData.js';

import { combineIngredientsAndMeasures } from './combineIngredients.js';

import { generateRecipeHtml } from './generateMeal.js';

export function fetchRecipes(url) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const meals = data.meals;

      if (!meals) {
        showNoResultsMessage();
      } else {
        meals.forEach((meal) => {
          const ingredients = filterData(meal, 'Ingredient');
          const measures = filterData(meal, 'Measure');
          combineIngredientsAndMeasures(ingredients, measures);

          const recipeHtml = generateRecipeHtml(
            meal,
            combineIngredientsAndMeasures(ingredients, measures)
          );
          console.log(recipeHtml);
          addRecipeToPage(recipeHtml);
        });
      }
    })
    .finally(() => hideSpinner());
}
