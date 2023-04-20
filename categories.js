import { showSpinner, hideSpinner } from './utils.js';

// const categoriesDiv = document.querySelector('.categories');
const body = document.querySelector('body');
const categoriesList = document.querySelector('.categoriesList');

showSpinner();

function mealsCategories() {
  fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
    .then((response) => response.json())
    .then((data) => {
      const categories = data.categories;
      console.log(categories);
      categories.map((category) => {
        const newCategory = document.createElement('li');
        newCategory.innerHTML = `<form action="category.html">
        <input type="hidden" name="category" value="${category.strCategory}" />
        ${category.strCategory}<article class="category">
        <header>
          <img src="${category.strCategoryThumb}" alt="${category.strCategory}">
        </header>
        </article>
        <input id="search-btn" type="submit" value="Find recipes" />
        </form>`;
        categoriesList.appendChild(newCategory);
        body.appendChild(categoriesList);
      });
    })
    .finally(() => hideSpinner());
}

mealsCategories();

// https://www.themealdb.com/api/json/v1/1/filter.php?c=${category.strCategory}
