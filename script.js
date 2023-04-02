const searchBtn = document.querySelector('#search-btn');
const searchInput = document.querySelector('#search-input');
const body = document.querySelector('body');
const generateContent = document.querySelector('.generate-content');

searchInput.addEventListener('input', searchRecipes);

function searchRecipes(event) {
  event.preventDefault();
  const searchInput = document.querySelector('#search-input');
  const searchQuery = searchInput.value;
  console.log(searchQuery);

  generateContent.innerHTML = '';

  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`)
    .then((response) => response.json())
    .then((data) => {
      const { meals } = data;

      console.log(meals);
      if (meals) {
        meals.map((meal, index) => {
          console.log(meal);

          const ingredients = filterData(meal, 'Ingredient');
          const measuers = filterData(meal, 'Measure');

          console.log(combineIngredientsAndMeasures(ingredients, measuers));

          const newElement = document.createElement('div');
          newElement.innerHTML = `<div>
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
            <section class="ingredients">
              <h2>Ingredients</h2>
              <ul>
                ${combineIngredientsAndMeasures(ingredients, measuers)}
              </ul>
            </section>
            <section class="directions">
              <h2>Directions</h2>
              <p>${meal.strInstructions}</p>
          
        </div>`;
          generateContent.appendChild(newElement);
        });
      } else {
        generateContent.innerHTML = `<h1>Sorry no meals</h1>`;
      }
    });
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