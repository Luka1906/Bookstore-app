import * as Book from "../models/bookModel.js";

export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.getBooks();
    const carouselBooks = await Book.getCarouselBooks();

    res.render("index.ejs", { books, carouselBooks });
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
