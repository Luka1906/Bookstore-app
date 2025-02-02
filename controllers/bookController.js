import * as Book from "../models/bookModel.js";

export const getAllBooks = async (req, res) => {
  try {
    const [books, carouselBooks] = await Promise.all([
      Book.getBooks(),
      Book.getCarouselBooks(),
    ]);
    const bookData = books.rows;
    const bookCount = books.rowCount;
   
    // Extract and process unique categories

    const categories = bookData.flatMap((book) => book.category);
    
// Normalize categories by trimming spaces and collapsing multiple spaces to one
const normalizedCategories = categories
  .map((category) => category.trim()) // Clean up spaces
  .map((category) =>
    category
      .split(" ") // Split each sentence into words
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
      .join(" ") // Join the words back into a sentence
  );

// Get unique categories
const uniqueCategories = [...new Set(normalizedCategories)];
    
 
    res.render("index.ejs", {
      books: bookData,
      bookCount,
      carouselBooks,
      genres: uniqueCategories
    });
  } catch (error) {
    res.status(500).send("Error fetching books");
  }
};


export const getBook = async (req, res) => {
  try {
    const { id } = req.params;
    const bookArray = await Book.getBook(id);
    const book = bookArray ? bookArray[0] : "No data";
  
// Normalize categories by trimming spaces and collapsing multiple spaces to one
const genres = book.category
  .map((category) => category.trim()) // Clean up spaces
  .map((category) =>
    category
      .split(" ") // Split each category into words
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
      .join(" ") // Join the words back into a sentence
  )
  .join(", "); // Join all categories with commas;


  
  
    res.render("bookDetails.ejs", { book, genres });
  } catch (error) {
    res.status(500).send("Error fetching book");
  }
};

export const getCollection = async (req, res) => {
  try {
    const favourites = await Book.getFavourites();
    res.render("favourites.ejs", {favourites});
    
  } catch (error) {
    res.status(500).send("Error fetching favourite books")
  }


};

export const addNewBook = async (req, res) => {
  res.render("addBook.ejs");
};


