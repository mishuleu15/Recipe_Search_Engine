const searchBtn = document.querySelector('#search-btn');
const searchInput = document.querySelector('#search-input');
const body = document.querySelector('body');
const generateContent = document.querySelector('.generate-content');

// searchBtn.addEventListener('click', searchRecipes);

searchInput.addEventListener('input', searchRecipes);

function searchRecipes(event) {
  event.preventDefault();
  const searchInput = document.querySelector('#search-input');
  const searchQuery = searchInput.value;
  console.log(searchQuery);

  generateContent.innerHTML = '';

  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`)
    .then((response) => response.json())
    .then((data) => {
      const { meals } = data;
      const ingredients = [];
      console.log(meals);
      if (meals) {
        meals.map((meal, index) => {
          console.log(meal);
          console.log(ingredients);
          const newElement = document.createElement('div');
          newElement.innerHTML = `<div>
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
            <section class="ingredients">
              <h2>Ingredients</h2>
              <ul>
                <li>1 pound sweet Italian sausage</li>
                <li>3/4 pound lean ground beef</li>
                <li>1/2 cup minced onion</li>
                <li>2 cloves garlic, crushed</li>
                <li>1 (28 ounce) can crushed tomatoes</li>
                <li>2 (6 ounce) cans tomato paste</li>
                <li>2 (6.5 ounce) cans canned tomato sauce</li>
                <li>1/2 cup water</li>
                <li>2 tablespoons white sugar</li>
                <li>1 1/2 teaspoons dried basil leaves</li>
                <li>1/2 teaspoon fennel seeds</li>
                <li>1 teaspoon Italian seasoning</li>
                <li>1 tablespoon salt</li>
                <li>1/4 teaspoon ground black pepper</li>
                <li>4 tablespoons chopped fresh parsley</li>
                <li>12 lasagna noodles</li>
                <li>16 ounces ricotta cheese</li>
                <li>1 egg</li>
                <li>3/4 pound mozzarella cheese, sliced</li>
                <li>3/4 cup grated Parmesan cheese</li>
              </ul>
            </section>
            <section class="directions">
              <h2>Directions</h2>
              <p>${meal.strInstructions}</p>
          
        </div>`;
          generateContent.appendChild(newElement);
        });
      } else {
        // const newElement = document.createElement('div');
        generateContent.innerHTML = `<h1>Sorry no meals</h1>`;
      }
    });

  // Call API to fetch recipe data based on search query
}
