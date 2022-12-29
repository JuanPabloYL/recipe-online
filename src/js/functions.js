import {
  toggleBtnNav,
  navBarLinks,
  searchButton,
  recipeForm,
  closeFormButton,
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
