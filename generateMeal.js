export function generateRecipeHtml(meal, combinedIngredients) {
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
         ${combinedIngredients}
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
