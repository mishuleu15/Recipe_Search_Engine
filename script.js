import { fetchRecipes } from './fetchRecipes.js';
import { showSpinner } from './utils.js';

const searchInput = document.querySelector('#search-input');
const generateContent = document.querySelector('.generate-content');

searchInput.addEventListener('input', searchRecipes);

function searchRecipes(event) {
  event.preventDefault();
  showSpinner();

  generateContent.innerHTML = '';

  const searchQuery = searchInput.value;

  fetchRecipes(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`
  );
}

function getRandomRecipe() {
  showSpinner();
  fetchRecipes('https://www.themealdb.com/api/json/v1/1/random.php');
}

getRandomRecipe();
