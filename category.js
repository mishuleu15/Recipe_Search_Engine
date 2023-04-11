window.onload = function () {
  let url = new URL(window.location.href);
  let categoryName = url.searchParams.get('category');

  function mealsCategories() {
    console.log(categoryName);
    fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`
    )
      .then((response) => response.json())
      .then((data) => {
        const meals = data.meals;
        console.log(meals);
        // categories.map((category) => {
        //   const newCategory = document.createElement('li');
        //   newCategory.innerHTML = `<form action="category.html">
        //   <input type="hidden" name="category" value="${category.strCategory}" />
        //   <a href="category.html">${category.strCategory}<article class="category">
        //   <header>
        //     <img src="${category.strCategoryThumb}" alt="${category.strCategory}">
        //   </header>
        //   </article></a>
        //   <input id="search-btn" type="submit" value="Find recipes" />
        //   </form>`;
        //   categoriesList.appendChild(newCategory);
        //   body.appendChild(categoriesList);
        // });
      });
  }

  mealsCategories();
};

// mealsCategories();
