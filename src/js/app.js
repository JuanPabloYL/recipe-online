import { startApp, toggleClass } from "./functions.js";
import {
  closeFormButton,
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

if (searchButton) {
  searchButton.addEventListener("click", () => {
    document.querySelector("body").classList.add("fixed");
    toggleClass(true, recipeForm, "active");
  });
}

if (recipeForm) {
  closeFormButton.addEventListener("click", () => {
    document.querySelector("body").classList.remove("fixed");
    toggleClass(false, recipeForm, "active");
  });
}

crossCloseRecipe.addEventListener("click", () => {
  document.querySelector("body").classList.remove("fixed");
  toggleClass(false, recipeModal, "active");
});

document.addEventListener("DOMContentLoaded", startApp);
