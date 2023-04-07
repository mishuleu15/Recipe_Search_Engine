const searchBtn = document.querySelector('#search-btn');
const searchInput = document.querySelector('#search-input');
const spinner = document.querySelector('#loader');
const body = document.querySelector('body');
const generateContent = document.querySelector('.generate-content');

searchInput.addEventListener('input', searchRecipes);

function searchRecipes(event) {
  event.preventDefault();
  showSpinner();

  const searchQuery = searchInput.value;

  fetchRecipes(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`
  );
}

function fetchRecipes(url) {
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

function filterData(data, key) {
  const matchingKey = new RegExp(key);
  const matchingKeys = Object.entries(data).reduce((acc, [key, value]) => {
    if (matchingKey.test(key)) {
      acc[key] = value;
    }
    return acc;
  }, {});

  const filteredObj = Object.fromEntries(
    Object.entries(matchingKeys).filter(
      ([key, value]) => value !== '' && value != null && value !== ' '
    )
  );

  return filteredObj;
}

function combineIngredientsAndMeasures(ingredients, measuers) {
  let combinedIngredientsMeasures = [];
  const allIngredients = Object.values(ingredients).map((ingredient) => {
    return ingredient;
  });

  const allMeasures = Object.values(measuers).map((measure) => {
    return measure;
  });

  for (let i = 0; i < allIngredients.length; i++) {
    combinedIngredientsMeasures.push(
      `${allIngredients[i]} -- ${allMeasures[i]}`
    );
  }

  return combinedIngredientsMeasures
    .map((item) => `<li>${item}</li>`)
    .join(' ');
}

function generateRecipeHtml(meal, ingredients) {
  return `
    <div class="recipe-content">
      <article class="recipe">
        <header>
          <h1>${meal.strMeal}</h1>
          <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        </header>
        <div class="details">
          <p><strong>Servings:</strong> 6</p>
          <p><strong>Prep time:</strong> 1 hour</p>
          <p><strong>Cook time:</strong> 1 hour 30 minutes</p>
        </div>
        <section>
          <h2>Ingredients</h2>
          <ul class="ingredients">
            ${ingredients
              .map((ingredient) => `<li>${ingredient}</li>`)
              .join('')}
          </ul>
        </section>
        <section class="directions">
          <h2>Directions</h2>
          <p>${meal.strInstructions}</p>
        </section>
      </article>
    </div>
  `;
}

function addRecipeToPage(html) {
  generateContent.insertAdjacentHTML('beforeend', html);
}

function showSpinner() {
  spinner.style.display = 'block';
}

function hideSpinner() {
  spinner.style.display = 'none';
}

function showNoResultsMessage() {
  generateContent.innerHTML = '<h2>Sorry no meals</h2>';
  hideSpinner();
}

function getRandomRecipe() {
  showSpinner();
  fetchRecipes('https://www.themealdb.com/api/json/v1/1/random.php');
}

getRandomRecipe();
