import {
  listContainer,
  listRecipes,
  recipeContainer,
  galleryContainer,
  headerLinks,
  recipeForm,
} from "./nodes.js";

export function toggleClass(state, element, style) {
  if (!state) {
    element.classList.remove(style);
    return;
  }
  element.classList.add(style);
}

function activeHeaderLinks() {
  headerLinks.forEach((header) => header.classList.add("active"));
}

export function startApp() {
  const selectCategories = document.querySelector("#categories");
  selectCategories.addEventListener("change", selectCategory);

  obtainCategories();

  async function obtainCategories() {
    try {
      const url = await fetch(
        "https://www.themealdb.com/api/json/v1/1/categories.php"
      );
      const data = await url.json();
      showCategories(data.categories);
    } catch (error) {
      console.log(error);
    }
  }

  function showCategories(categories = []) {
    categories.forEach((category) => {
      const { strCategory } = category;
      const option = document.createElement("OPTION");
      option.value = strCategory;
      option.textContent = strCategory;

      selectCategories.appendChild(option);
    });
  }

  async function selectCategory(e) {
    try {
      const category = e.target.value;
      const url = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
      );
      const response = await url.json();
      showRecipe(response.meals);
    } catch (error) {
      console.log(error);
    }
  }

  function showRecipe(recipes = []) {
    //   Iterate on the results
    recipes.forEach((recipe) => {
      listContainer.classList.remove("hidden");
      recipeContainer.classList.add("hidden");
      galleryContainer.classList.add("hidden");
      recipeForm.classList.remove("active");
      activeHeaderLinks();
      const { idMeal, strMeal, strMealThumb } = recipe;

      const recipeCard = document.createElement("DIV");
      recipeCard.classList.add("list__item");

      const recipeImage = document.createElement("IMG");
      recipeImage.alt = `Recipe image ${strMeal}`;
      recipeImage.src = strMealThumb;

      const recipeHeading = document.createElement("H3");
      recipeHeading.textContent = strMeal;

      const recipeButton = document.createElement("BUTTON");
      recipeButton.textContent = "View Recipe";

      // Inyectar en el codigo HTML
      recipeCard.appendChild(recipeImage);
      recipeCard.appendChild(recipeHeading);
      recipeCard.appendChild(recipeButton);

      listRecipes.appendChild(recipeCard);
    });
  }
}
