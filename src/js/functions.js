import { toggleBtnNav, navBarLinks } from "./nodes.js";

console.log(navBarLinks);
toggleBtnNav.addEventListener("click", () => {
  navBarLinks.classList.toggle("active");
});
