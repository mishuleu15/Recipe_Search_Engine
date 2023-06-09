import { fetchRecipes } from './fetchRecipes.js';
import { showSpinner } from './utils.js';

const searchInput = document.querySelector('#search-input');
const searchBtn = document.querySelector('#search-btn');
const generateContent = document.querySelector('.generate-content');

searchBtn.addEventListener('click', searchRecipes);

showSpinner();

function searchRecipes(event) {
  event.preventDefault();

  generateContent.innerHTML = '';

  const searchQuery = searchInput.value;

  fetchRecipes(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`
  );

  searchInput.value = '';
}

function getRandomRecipe() {
  // showSpinner();
  fetchRecipes('https://www.themealdb.com/api/json/v1/1/search.php?f=b');
}

getRandomRecipe();
