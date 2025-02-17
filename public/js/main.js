import { setUpNavigation } from "./navigation.js";
import { setUpSearch } from "./search.js";
import { setUpSlider } from "./slider.js";
import { setUpSorting } from "./sort.js";
import { setUpBookDetails } from "./bookDetails.js";
import { addToFavourites } from "./favourites.js";
import { setUpSignIn } from "./signIn.js";

document.addEventListener("DOMContentLoaded", () => {
  setUpNavigation();
  setUpSearch();
  console.log(window.location.pathname); // Log the pathname to check
  
  if (window.location.pathname === "/") {
    setUpSlider();
    setUpSorting();
    addToFavourites();
  } else if (window.location.pathname === "/signIn") {
    setUpSignIn();  // Only call search setup on sign-in page
  } else {
    setUpBookDetails(); // Only call it on the book details page
  }
});
