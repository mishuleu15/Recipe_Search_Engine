const spinner = document.querySelector('#loader');
const generateContent = document.querySelector('.generate-content');

export function addRecipeToPage(html) {
  generateContent.insertAdjacentHTML('beforeend', html);
}

export function showSpinner() {
  spinner.style.display = 'block';
}

export function hideSpinner() {
  spinner.style.display = 'none';
}

export function showNoResultsMessage() {
  generateContent.innerHTML = '<h2>Sorry no meals</h2>';
  hideSpinner();
}
