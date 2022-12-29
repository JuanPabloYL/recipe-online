import {
  toggleBtnNav,
  navBarLinks,
  searchButton,
  recipeForm,
  closeFormButton,
  crossCloseRecipe,
  closeRecipeButton,
  viewRecipeButton,
  recipeModal,
} from "./nodes.js";

toggleBtnNav.addEventListener("click", () => {
  navBarLinks.classList.toggle("active");
});

searchButton.addEventListener("click", () => {
  recipeForm.classList.add("active");
});

closeFormButton.addEventListener("click", () => {
  recipeForm.classList.remove("active");
});

viewRecipeButton.addEventListener("click", () => {
  recipeModal.classList.add("active");
});

crossCloseRecipe.addEventListener("click", () => {
  recipeModal.classList.remove("active");
});

closeRecipeButton.addEventListener("click", () => {
  recipeModal.classList.remove("active");
});
