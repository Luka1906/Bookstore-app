import * as Book from "../models/bookModel.js";

export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.getBooks();

    // Modyfing categories before sendinf on the front

    const categories = books.map((book) => book.category);
    const allCategories = categories.flatMap((category) =>
      category.split(",").map((g) => g.trim())
    );

    const uniqueCategories = [...new Set(allCategories)].map(
      (category) => category.charAt(0).toUpperCase() + category.slice(1)
    );

    const carouselBooks = await Book.getCarouselBooks();

    res.render("index.ejs", { books, carouselBooks, genres: uniqueCategories });
  } catch (error) {
    res.status(500).send("Error fetching books");
  }
};

export const addNewBook = async (req, res) => {
  res.render("addBook.ejs");
};

export const getCollection = async (req, res) => {
  res.render("collection.ejs");
};
