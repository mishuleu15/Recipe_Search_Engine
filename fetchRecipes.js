import { addRecipeToPage, hideSpinner, showNoResultsMessage } from './utils.js';

import { filterData } from './filterData.js';

import { combineIngredientsAndMeasures } from './combineIngredients.js';

import { generateRecipeHtml } from './generateMeal.js';

function toggleText(event) {
  const targetButton = event.target;
  const hiddenText = targetButton.parentElement.querySelector('.hidden-text');
  const showMoreButton = targetButton.parentElement.querySelector('.show-more');
  const hideTextButton = targetButton.parentElement.querySelector('.hide-text');

  if (hiddenText.style.display === 'none') {
    hiddenText.style.display = 'inline';
    showMoreButton.style.display = 'none';
    hideTextButton.style.display = 'inline';
  } else {
    hiddenText.style.display = 'none';
    showMoreButton.style.display = 'inline';
    hideTextButton.style.display = 'none';
  }
}

function showText(text) {
  const maxLength = 200;
  const trimmedText = text.trim();
  const textLength = trimmedText.length;
  const ellipsis = '...';

  if (textLength > maxLength) {
    const truncatedText = trimmedText.slice(0, maxLength) + ellipsis;
    const showMoreButton = `<button class="show-more" onclick="toggleText(event)">&#x1F50D; Show More</button>`;
    const hiddenText = `<span class="hidden-text" style="display:none">${trimmedText}</span>`;
    const hideTextButton = `<button class="hide-text" style="display:none" onclick="toggleText(event)">&#x1F50D; Hide Text</button>`;
    return `${truncatedText} ${showMoreButton} ${hiddenText} ${hideTextButton}`;
  } else {
    return trimmedText;
  }
}

export function fetchRecipes(url) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const meals = data.meals;

      if (!meals) {
        showNoResultsMessage();
      } else {
        meals.forEach((meal) => {
          meal.strInstructions = showText(meal.strInstructions);
          const ingredients = filterData(meal, 'Ingredient');
          const measures = filterData(meal, 'Measure');
          combineIngredientsAndMeasures(ingredients, measures);

          const recipeHtml = generateRecipeHtml(
            meal,
            combineIngredientsAndMeasures(ingredients, measures)
          );

          addRecipeToPage(recipeHtml);
        });
      }
    })
    .finally(() => hideSpinner());
}
