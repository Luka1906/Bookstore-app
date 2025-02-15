export const generateStarRating = (rating) => {
  let stars = "";
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      stars += '<span class="star filled">&#9733;</span>';
    } else if (i === Math.floor(rating) + 1 && rating % 1 !== 0) {
      stars += '<span class="star half-filled">&#9733;</span>';
    } else {
      stars += '<span class="star">&#9733;</span>';
    }
  }
  return `<div class="book-rating">${stars}</div>`;
};
