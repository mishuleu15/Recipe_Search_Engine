const body = document.querySelector('body');
const categoriesMealsByArea = document.querySelector('.areaMealsList');

function mealsCategories() {
  fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
    .then((response) => response.json())
    .then((data) => {
      const mealsByArea = data.meals;

      mealsByArea.map((mealByArea, index) => {
        const newMealsByArea = document.createElement('li');

        newMealsByArea.innerHTML = `<form id="mealsByArea${index}" action="categoryArea.html">
        <input type="hidden" name="mealByCountry" value="${mealByArea.strArea}" />
        ${mealByArea.strArea}<article class="category">
        </article>
        </form>`;

        newMealsByArea.addEventListener('click', () => {
          document.getElementById(`mealsByArea${index}`).submit();
        });

        categoriesMealsByArea.appendChild(newMealsByArea);
        body.appendChild(categoriesMealsByArea);
      });
    });
}

mealsCategories();
