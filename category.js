import { showSpinner, hideSpinner } from './utils.js';

const body = document.querySelector('body');
const categoriesMealList = document.querySelector('.categoriesMealsList');

showSpinner();

window.onload = function () {
  let url = new URL(window.location.href);
  let categoryName = url.searchParams.get('category');

  const h1 = document.createElement('h1');
  h1.textContent = categoryName;
  body.appendChild(h1);

  function mealsCategories() {
    console.log(categoryName);
    fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`
    )
      .then((response) => response.json())
      .then((data) => {
        const meals = data.meals;
        console.log(meals);
        meals.map((meal) => {
          const newMeal = document.createElement('li');
          newMeal.innerHTML = `<form action="meal.html">
          <input type="hidden" name="meal" value="${meal.idMeal}" />
          ${meal.strMeal}<article class="category">
          <header>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
          </header>
          </article>
          <input id="search-btn" type="submit" value="Show recipe" />
          </form>`;
          categoriesMealList.appendChild(newMeal);
          body.appendChild(categoriesMealList);
        });
      })
      .finally(() => hideSpinner());
  }

  mealsCategories();
};

// mealsCategories();
