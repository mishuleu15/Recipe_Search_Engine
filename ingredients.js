const body = document.querySelector('body');
const ingredientsList = document.querySelector('.ingredientsList');

function mealsCategories() {
  fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
    .then((response) => response.json())
    .then((data) => {
      const ingredients = data.meals;

      console.log(ingredients);

      const filteredIngredients = ingredients.filter(
        (ingredient) =>
          ingredient.strDescription !== null && ingredient.strDescription !== ''
      );

      filteredIngredients.map((ingredient) => {
        const newIngredient = document.createElement('li');

        newIngredient.innerHTML = `<form action="category.html">
        <input type="hidden" name="category" value="${ingredient.strIngredient}" />
        ${ingredient.strIngredient}<article class="category">
       <p>${ingredient.strDescription}</p>
        </article>
        <input id="search-btn" type="submit" value="Find recipes" />
        </form>`;
        ingredientsList.appendChild(newIngredient);
        body.appendChild(ingredientsList);
      });
    });
}

mealsCategories();
