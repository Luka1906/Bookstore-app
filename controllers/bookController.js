import * as Book from "../models/bookModel.js";

export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.getBooks();
    const bookData = books.rows;
    const bookCount = books.rowCount;

    // Modyfing categories before sendin on the front

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

    const carouselBooks = await Book.getCarouselBooks();

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

    res.render("bookMore.ejs", { book });
  } catch (error) {
    res.status(500).send("Error fetching book");
  }
};

export const getCollection = async (req, res) => {
  res.render("collection.ejs");
};
