import { setUpNavigation } from "./navigation.js";
import { setUpSearch } from "./search.js";
import { setUpSlider } from "./slider.js";
import { setUpSorting } from "./sort.js";
import { setUpBookDetails } from "./bookDetails.js";
import { addToFavourites as setUpFavourites } from "./favourites.js";


document.addEventListener("DOMContentLoaded", () => {
  setUpNavigation();
  setUpSearch();
  if (window.location.pathname === "/") {
    setUpSlider();
    setUpSorting();
    setUpFavourites();
  } else {
    setUpBookDetails(); // Only call it on the book details page
  }
});
