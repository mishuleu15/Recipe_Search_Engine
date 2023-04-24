import { showSpinner, hideSpinner } from './utils.js';

const body = document.querySelector('body');
const categoriesMealsByArea = document.querySelector('.areaMealsList');

const randomColors = [
  { gradient0: { gradientStart: '#6DE195', gradientEnd: '#C4E759' } },
  { gradient1: { gradientStart: '#41C7AF', gradientEnd: '#54E38E' } },
  { gradient2: { gradientStart: '#99E5A2', gradientEnd: '#D4FC78' } },
  { gradient3: { gradientStart: '#ABC7FF', gradientEnd: '#C1E3FF' } },
  { gradient4: { gradientStart: '#6CACFF', gradientEnd: '#8DEBFF' } },
  { gradient5: { gradientStart: '#5583EE', gradientEnd: '#41D8DD' } },
  { gradient6: { gradientStart: '#A16BFE', gradientEnd: '#DEB0DF' } },
  { gradient7: { gradientStart: '#D279EE', gradientEnd: '#F8C390' } },
  { gradient8: { gradientStart: '#F78FAD', gradientEnd: '#FDEB82' } },
  { gradient9: { gradientStart: '#BC3D2F', gradientEnd: '#A16BFE' } },
  { gradient10: { gradientStart: '#A43AB2', gradientEnd: '#E13680' } },
  { gradient11: { gradientStart: '#9D2E7D', gradientEnd: '#E16E93' } },
  { gradient12: { gradientStart: '#F5CCF6', gradientEnd: '#F1EEF9' } },
  { gradient13: { gradientStart: '#F0EFF0', gradientEnd: '#FAF8F9' } },
  { gradient14: { gradientStart: '#6DE195', gradientEnd: '#C4E759' } },
  { gradient15: { gradientStart: '#41C7AF', gradientEnd: '#54E38E' } },
  { gradient16: { gradientStart: '#99E5A2', gradientEnd: '#D4FC78' } },
  { gradient17: { gradientStart: '#ABC7FF', gradientEnd: '#C1E3FF' } },
  { gradient18: { gradientStart: '#6CACFF', gradientEnd: '#8DEBFF' } },
  { gradient19: { gradientStart: '#5583EE', gradientEnd: '#41D8DD' } },
  { gradient20: { gradientStart: '#A16BFE', gradientEnd: '#DEB0DF' } },
  { gradient21: { gradientStart: '#D279EE', gradientEnd: '#F8C390' } },
  { gradient22: { gradientStart: '#F78FAD', gradientEnd: '#FDEB82' } },
  { gradient23: { gradientStart: '#BC3D2F', gradientEnd: '#A16BFE' } },
  { gradient24: { gradientStart: '#A43AB2', gradientEnd: '#E13680' } },
  { gradient25: { gradientStart: '#9D2E7D', gradientEnd: '#E16E93' } },
  { gradient26: { gradientStart: '#F5CCF6', gradientEnd: '#F1EEF9' } },
  { gradient27: { gradientStart: '#6DE195', gradientEnd: '#C4E759' } },
];

showSpinner();

function mealsCategories() {
  fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
    .then((response) => response.json())
    .then((data) => {
      const mealsByArea = data.meals;

      mealsByArea.map((mealByArea, index) => {
        const newMealsByArea = document.createElement('li');

        newMealsByArea.innerHTML = `<form id="mealsByArea${index}" action="categoryArea.html">
        <input type="hidden" name="mealByCountry" value="${mealByArea.strArea}" /><h3>${mealByArea.strArea}</h3></form>`;

        const categoriesMealsByAreaLiElements =
          document.querySelectorAll('.areaMealsList li');

        categoriesMealsByAreaLiElements.forEach((item, index) => {
          item.style.background = `linear-gradient(33deg,  ${
            randomColors[index][`gradient${index}`].gradientStart
          }, ${randomColors[index][`gradient${index}`].gradientEnd})`;
        });

        newMealsByArea.addEventListener('click', () => {
          document.getElementById(`mealsByArea${index}`).submit();
        });

        categoriesMealsByArea.appendChild(newMealsByArea);
        body.appendChild(categoriesMealsByArea);
      });
    })
    .finally(() => hideSpinner());
}

mealsCategories();
