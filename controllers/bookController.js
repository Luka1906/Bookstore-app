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

    const categories = bookData.map((book) => book.category);
    const allCategories = categories.flatMap((category) =>
      category.split(",").map((g) => g.trim())
    );

    const uniqueCategories = [...new Set(allCategories)].map(
      (genres) =>
        genres
          .split(" ") // Split each sentence into words
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
          .join(" ") // Join the words back into a sentence
    );

    res.render("index.ejs", {
      books: bookData,
      bookCount,
      carouselBooks,
      genres: uniqueCategories,
    });
  } catch (error) {
    res.status(500).send("Error fetching books");
  }
};


export const addNewBook = async (req, res) => {
  res.render("addBook.ejs");
};

export const getBook = async (req, res) => {
  try {
    const { id } = req.params;
    const bookArray = await Book.getBook(id);
    const book = bookArray ? bookArray[0] : "No data";
    console.log(book)

    res.render("bookDetails.ejs", { book });
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
