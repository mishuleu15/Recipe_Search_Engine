const body = document.querySelector('body');
const ingredientMealsList = document.querySelector('.ingredientMealsList');

window.onload = function () {
  let url = new URL(window.location.href);
  let ingredient = url.searchParams.get('ingredient');

  function mealsCategories() {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`)
      .then((response) => response.json())
      .then((data) => {
        const ingredients = data.meals;

        console.log(ingredients);

        const filteredIngredients = ingredients.filter(
          (ingredient) =>
            ingredient.strDescription !== null &&
            ingredient.strDescription !== ''
        );

        filteredIngredients.map((ingredient, index) => {
          const newIngredient = document.createElement('li');

          newIngredient.innerHTML = `<form id="mealIngredient${index}" action="meal.html">
        <input type="hidden" name="meal" value="${ingredient.idMeal}" />
        
          <article class="category">
          <header>
            <img src="${ingredient.strMealThumb}" alt="${ingredient.strMeal}">
            <h3>${ingredient.strMeal}</h3>
          </header> 
          </article>
        </form>`;

          newIngredient.addEventListener('click', () => {
            document.getElementById(`mealIngredient${index}`).submit();
          });

          ingredientMealsList.appendChild(newIngredient);
          body.appendChild(ingredientMealsList);
        });
      });
  }

  mealsCategories();
};
