export function generateRecipeHtml(meal, combinedIngredients) {
  return `
    <div class="recipe-content">
      <article class="recipe">
        <header>
          <h4>${meal.strMeal}</h4>
          <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        </header>
        <div class="details">
          <p><strong>Servings:</strong> 6</p>
          <p><strong>Prep time:</strong> 1 hour</p>
          <p><strong>Cook time:</strong> 1 hour 30 minutes</p>
        </div>
        <section>
          <h4>Ingredients</h4>
          <ul class="ingredients">
         ${combinedIngredients}
          </ul>
        </section>
        <section class="directions">
          <h4>Directions</h4>
          <p>${meal.strInstructions}</p>
        </section>
      </article>
    </div>
  `;
}
