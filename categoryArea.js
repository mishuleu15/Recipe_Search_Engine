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
        mealsByCountry.map((meal, index) => {
          const newMeal = document.createElement('li');
          newMeal.innerHTML = `<form id="meal${index}" action="meal.html">
          <input type="hidden" name="meal" value="${meal.idMeal}" />
          
          <header>
            <article class="category">
              <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
              <h3>${meal.strMeal}</h3>
          </header>
          </article>
          </form>`;

          newMeal.addEventListener('click', () => {
            document.getElementById(`meal${index}`).submit();
          });

          mealsListByCountry.appendChild(newMeal);
          body.appendChild(mealsListByCountry);
        });
      })
      .finally(() => hideSpinner());
  }

  mealsCategories();
};
