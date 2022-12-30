import {
  listContainer,
  listRecipes,
  recipeContainer,
  galleryContainer,
  headerLinks,
  recipeModal,
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
  const recipeForm = document.querySelector("#recipe-form-search");
  recipeForm.addEventListener("change", selectCategory);

  obtainCategories();

  async function obtainCategories() {
    try {
      const url = await fetch(
        "https://www.themealdb.com/api/json/v1/1/categories.php"
      );
      const data = await url.json();
      showCategories(data.categories, selectCategories);
      showCategories(data.categories, recipeForm);
    } catch (error) {
      console.log(error);
    }
  }

  function showCategories(categories = [], element) {
    categories.forEach((category) => {
      const { strCategory } = category;
      const option = document.createElement("OPTION");
      option.value = strCategory;
      option.textContent = strCategory;

      element.appendChild(option);
    });
  }

  async function selectCategory(e) {
    try {
      const category = e.target.value;
      const url = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
      );
      const response = await url.json();
      console.log(response);
      showRecipe(response.meals);
    } catch (error) {
      console.log(error);
    }
  }

  function showRecipe(recipes = []) {
    cleanHTML(listRecipes);

    const heading = document.querySelector(".list__heading");
    heading.textContent = recipes.length ? "Results" : "No results found";
    //   Iterate on the results
    recipes.forEach((recipe) => {
      const recipeForm = document.querySelector(".recipe-form");
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
      recipeButton.onclick = function () {
        selectRecipe(idMeal);
      };

      // Inyectar en el codigo HTML
      recipeCard.appendChild(recipeImage);
      recipeCard.appendChild(recipeHeading);
      recipeCard.appendChild(recipeButton);

      listRecipes.appendChild(recipeCard);
    });
  }

  async function selectRecipe(id) {
    const url = `https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    const data = await fetch(url);
    const response = await data.json();
    showModalRecipe(response.meals[0]);
  }

  function showModalRecipe(recipe) {
    console.log(recipe);
    const { idMeal, strInstructions, strMeal, strMealThumb } = recipe;
    recipeModal.classList.add("active");

    // Añadir contenido al modal
    const modalBodyIngredients = document.querySelector(
      ".recipe-modal__ingredients"
    );
    const modalTitle = document.querySelector(".recipe-modal__title");
    const modalImg = document.querySelector(".recipe-modal__img");
    const modalText = document.querySelector(".recipe-modal__content p");

    modalTitle.textContent = strMeal;
    modalImg.src = strMealThumb;
    modalText.textContent = strInstructions;

    const listGroup = document.createElement("UL");
    listGroup.classList.add("recipe-modal__list");
    //   Show ingredients
    for (let i = 1; i <= 20; i++) {
      if (recipe[`strIngredient${i}`]) {
        const ingredient = recipe[`strIngredient${i}`];
        const amount = recipe[`strMeasure${i}`];

        const ingredientLi = document.createElement("LI");
        ingredientLi.classList.add("recipe-modal__ingredient");
        ingredientLi.textContent = `${ingredient} - ${amount}`;

        listGroup.appendChild(ingredientLi);
      }
    }

    modalBodyIngredients.appendChild(listGroup);

    //Close/Add buttons
    // const addButton = document.querySelector(".recipe-modal-btn--add");
    // const closeButton = document.querySelector(".recipe-modal-btn--delete");
    // addButton.addEventListener("click", () => {
    //   if (!existStorage(idMeal)) {
    //     addButton.textContent = "Delete Favorite";
    //   } else {
    //     addButton.textContent = "Add Favorite";
    //   }
    // });
    const addButton = document.createElement("BUTTON");
    addButton.classList.add("recipe-modal-btn", "recipe-modal-btn--add");
    addButton.textContent = existStorage(idMeal)
      ? "Delete Favorite"
      : "Add Favorite";

    const closeButton = document.createElement("BUTTON");
    closeButton.classList.add("recipe-modal-btn", "recipe-modal-btn--delete");

    //   Local storage
    addButton.onclick = () => {
      if (existStorage(idMeal)) {
        deleteFavorite(idMeal);
        return;
      }
      addFavorite({ id: idMeal, title: strMeal, img: strMealThumb });
    };
  }

  function addFavorite(recipe) {
    const favorites = JSON.parse(localStorage.getItem("favorites")) ?? [];
    localStorage.setItem("favorites", JSON.stringify([...favorites, recipe]));
  }

  function deleteFavorite(id) {
    const favorites = JSON.parse(localStorage.getItem("favorites")) ?? [];
    const newFavorites = favorites.filter((favorite) => favorite.id !== id);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
  }

  function existStorage(id) {
    const favorites = JSON.parse(localStorage.getItem("favorites")) ?? [];
    return favorites.some((favorite) => favorite.id === id);
  }

  function cleanHTML(selector) {
    while (selector.firstChild) {
      selector.removeChild(selector.firstChild);
    }
  }
}
