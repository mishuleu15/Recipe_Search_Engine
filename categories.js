import { showSpinner, hideSpinner } from './utils.js';

const body = document.querySelector('body');
const categoriesList = document.querySelector('.categoriesList');

showSpinner();

function mealsCategories() {
  fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
    .then((response) => response.json())
    .then((data) => {
      const categories = data.categories;

      categories.map((category, index) => {
        const newCategory = document.createElement('li');

        newCategory.innerHTML = `<form id="category${index}" action="category.html">
        <input type="hidden" name="category" value="${category.strCategory}" />
        ${category.strCategory}
        <article class="category">
          <header>
            <img src="${category.strCategoryThumb}" alt="${category.strCategory}">
          </header>
        </article>
        </form>`;

        newCategory.addEventListener('click', () => {
          document.getElementById(`category${index}`).submit();
        });

        categoriesList.appendChild(newCategory);
        body.appendChild(categoriesList);
      });
    })
    .finally(() => hideSpinner());
}

mealsCategories();

// https://www.themealdb.com/api/json/v1/1/filter.php?c=${category.strCategory}
