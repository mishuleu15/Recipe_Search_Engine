const body = document.querySelector('body');
const ingredientsList = document.querySelector('.ingredientsList');

function toggleText(event) {
  const targetButton = event.target;
  const hiddenText = targetButton.parentElement.querySelector('.hidden-text');
  const showMoreButton = targetButton.parentElement.querySelector('.show-more');
  const hideTextButton = targetButton.parentElement.querySelector('.hide-text');

  if (hiddenText.style.display === 'none') {
    hiddenText.style.display = 'inline';
    showMoreButton.style.display = 'none';
    hideTextButton.style.display = 'inline';
  } else {
    hiddenText.style.display = 'none';
    showMoreButton.style.display = 'inline';
    hideTextButton.style.display = 'none';
  }
}

function showText(text) {
  const maxLength = 200;
  const trimmedText = text.trim();
  const textLength = trimmedText.length;
  const ellipsis = '...';

  if (textLength > maxLength) {
    const truncatedText = trimmedText.slice(0, maxLength) + ellipsis;
    const showMoreButton = `<button class="show-more" onclick="toggleText(event)">&#x1F50D; Show More</button>`;
    const hiddenText = `<span class="hidden-text" style="display:none">${trimmedText}</span>`;
    const hideTextButton = `<button class="hide-text" style="display:none" onclick="toggleText(event)">&#x1F50D; Hide Text</button>`;
    return `${truncatedText} ${showMoreButton} ${hiddenText} ${hideTextButton}`;
  } else {
    return trimmedText;
  }
}

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

        newIngredient.innerHTML = `
          <div class="ingredientCardContainer">
            <h3>${ingredient.strIngredient}</h3>
            <p>${showText(ingredient.strDescription)}</p>
            <form action="mealsByIngredients.html">
                <input
                    type="hidden"
                    name="ingredient"
                    value="${ingredient.strIngredient}"
                />
              <input id="search-btn" type="submit" value="Find recipes" />
            </form>
          </div>
        `;
        ingredientsList.appendChild(newIngredient);
        body.appendChild(ingredientsList);
      });
    });
}

mealsCategories();
