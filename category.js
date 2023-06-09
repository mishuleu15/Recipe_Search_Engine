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
    fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`
    )
      .then((response) => response.json())
      .then((data) => {
        const meals = data.meals;

        meals.map((meal, index) => {
          const newMeal = document.createElement('li');
          newMeal.innerHTML = `<form id="meal${index}" action="meal.html">
          <input type="hidden" name="meal" value="${meal.idMeal}" />
          <article class="category">
            <header>
              <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
              <h3>${meal.strMeal}</h3>
            </header>
          </article>
          </form>`;

          newMeal.addEventListener('click', () => {
            document.getElementById(`meal${index}`).submit();
          });

          categoriesMealList.appendChild(newMeal);
          body.appendChild(categoriesMealList);
        });
      })
      .finally(() => hideSpinner());
  }

  mealsCategories();
};

// mealsCategories();
