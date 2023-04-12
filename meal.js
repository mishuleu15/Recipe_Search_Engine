import { fetchRecipes } from './fetchRecipes.js';

const body = document.querySelector('body');
const meal = document.querySelector('.meal');

window.onload = function () {
  let url = new URL(window.location.href);
  let meal = url.searchParams.get('meal');

  // function mealsCategories() {
  //   console.log(meal);
  //   fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal}`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       const meal = data.meals;
  //       console.log(meal);
  //       meal.map((singleMeal) => {
  //         const newsingleMeal = document.createElement('li');
  //         newsingleMeal.innerHTML = `<form action="meal.html">
  //         <input type="hidden" name="category" value="${meal.idMeal}" />
  //         ${meal.strMeal}<article class="category">
  //         <header>
  //           <img src="${meal.strMealThumb}" alt="${meal.strMea}">
  //         </header>
  //         </article>
  //         <input id="search-btn" type="submit" value="Find recipes" />
  //         </form>`;
  //         meal.appendChild(newsingleMeal);
  //         body.appendChild(meal);
  //       });
  //     });
  // }

  // mealsCategories();

  console.log(
    fetchRecipes(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal}`)
  );
};
