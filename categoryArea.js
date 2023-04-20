// import { showSpinner, hideSpinner } from './utils';

const body = document.querySelector('body');
const mealsListByCountry = document.querySelector('.mealsListByCountry');
const spinner = document.querySelector('#loader');

function showSpinner() {
  spinner.style.display = 'block';
}

function hideSpinner() {
  spinner.style.display = 'none';
}

showSpinner();

window.onload = function () {
  let url = new URL(window.location.href);
  let mealByCountry = url.searchParams.get('mealByCountry');

  const h1 = document.createElement('h1');
  h1.textContent = mealByCountry;
  body.appendChild(h1);

  function mealsCategories() {
    console.log(mealByCountry);
    fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?a=${mealByCountry}`
    )
      .then((response) => response.json())
      .then((data) => {
        const mealsByCountry = data.meals;
        console.log(mealsByCountry);
        mealsByCountry.map((meal) => {
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
          mealsListByCountry.appendChild(newMeal);
          body.appendChild(mealsListByCountry);
        });
      })
      .finally(() => hideSpinner());
  }

  mealsCategories();
};
