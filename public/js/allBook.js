import { generateStarRating } from "./rating.js";
import { addToFavourites } from "./favourites.js";

export const renderBooks = (books) => {
  const booksSection = document.querySelector(".books-section");
  booksSection.innerHTML = "";
  books.forEach((book) => {
    const ratingHtml = generateStarRating(book.rating);
    const formatedDate = new Date(book.date).toLocaleDateString("en-US");
    const bookDiv = document.createElement("div");
    bookDiv.classList.add("image-container");
    bookDiv.innerHTML = `
        <i class="fas fa-heart heart-full-icon hidden image-heart"></i>
        <i class="far fa-heart heart-icon image-heart" data-id=${book.book_id}></i>
        <div class="image-section">
          <a href="book/${book.book_id}" target="_blank">
            <img src="https://covers.openlibrary.org/b/id/${book.book_id}-M.jpg" alt="${book.title}" />
          </a>
        </div>
        <div class="book-description">
          <p class="book-title">${book.title}</p>
          <p>${book.author}</p>
          ${ratingHtml}
          <div class="book-date"> Date read: ${formatedDate}</div>
        </div>`;
    booksSection.appendChild(bookDiv);
  });

  addToFavourites();
};
