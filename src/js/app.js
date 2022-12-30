import { startApp, toggleClass } from "./functions.js";
import {
  closeFormButton,
  closeRecipeButton,
  crossCloseRecipe,
  navBarLinks,
  recipeForm,
  recipeModal,
  searchButton,
  toggleBtnNav,
} from "./nodes.js";

toggleBtnNav.addEventListener("click", () => {
  navBarLinks.classList.toggle("active");
});

searchButton.addEventListener("click", () => {
  // recipeForm.classList.add("active");
  toggleClass(true, recipeForm, "active");
});

closeFormButton.addEventListener("click", () => {
  // recipeForm.classList.remove("active");
  toggleClass(false, recipeForm, "active");
});

crossCloseRecipe.addEventListener("click", () => {
  // recipeModal.classList.remove("active");
  toggleClass(false, recipeModal, "active");
});

closeRecipeButton.addEventListener("click", () => {
  // recipeModal.classList.remove("active");
  toggleClass(false, recipeModal, "active");
});

document.addEventListener("DOMContentLoaded", startApp);