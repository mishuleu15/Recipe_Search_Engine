const body = document.querySelector('body');
const categoriesMealsByArea = document.querySelector('.areaMealsList');

function mealsCategories() {
  fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
    .then((response) => response.json())
    .then((data) => {
      const mealsByArea = data.meals;
      console.log(mealsByArea);
      mealsByArea.map((mealByArea) => {
        const newMealsByArea = document.createElement('li');
        newMealsByArea.innerHTML = `<form action="categoryArea.html">
        <input type="hidden" name="mealByCountry" value="${mealByArea.strArea}" />
        ${mealByArea.strArea}<article class="category">
        </article>
        <input id="search-btn" type="submit" value="Find recipes" />
        </form>`;
        categoriesMealsByArea.appendChild(newMealsByArea);
        body.appendChild(categoriesMealsByArea);
      });
    });
}

mealsCategories();
