import axios from "axios";
import * as Book from "../models/bookModel.js";

export const getAllBooks = async (req, res) => {
  try {
    console.log(req.user + ' LUKA CAR')
    let {page} = req.query;
    page = parseInt(page) || 1 // Default to page 1 if no page query
    const limit = 8; // Number of books per page
    const offset = (page - 1) * limit; // Offset for pagination

    const [books, carouselBooks] = await Promise.all([
      Book.getBooks(limit, offset),
      Book.getCarouselBooks(),
    ]);
   
    const bookData = books.rows;
    const bookTotal = books.rowCount;
    const totalPages = Math.ceil(bookTotal/limit);


    const categories = bookData.map((book) => book.category);

    const allCategories = categories.flatMap((category) =>
      category.split(",").map((g) => g.trim())
    );
   
    const uniqueCategories = [
      ...new Set(
        allCategories.map((genre) => genre.toLowerCase()) // Convert all to lowercase before uniqueness check
      )
    ].map((genre) => {
      // Re-capitalize the first letter properly after uniqueness check
      return genre
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    });


    res.render("index.ejs", {
      books: bookData,
      bookCount:books.rowCount,
      carouselBooks,
      genres: uniqueCategories,
      currentPage: page,
      totalPages: totalPages,
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

    const categories = bookArray.map((book) => book.category);
    const allCategories = categories.flatMap((category) =>
      category.split(",").map((g) => g.trim())
    );

    const uniqueCategories = [...new Set(allCategories)]
      .map(
        (genres) =>
          genres
            .split(" ") // Split each sentence into words
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
            .join(" ") // Join the words back into a sentence
      )
      .join(", ");

    res.render("bookDetails.ejs", { book, genres: uniqueCategories });
  } catch (error) {
    res.status(500).send("Error fetching book");
  }
};

export const getCollection = async (req, res) => {
  try {
    const favourites = await Book.getFavourites();
    res.render("favourites.ejs", { favourites });
  } catch (error) {
    res.status(500).send("Error fetching favourite books");
  }
};

export const newBook = async (req, res) => {
  res.render("addBook.ejs");
};

export const addNewBook = async (req, res) => {
  const { title } = req.body;
  const { genre } = req.body;
  const { description } = req.body;
  const { rating } = req.body;
  const { date } = req.body;
  const bookData = await axios.get(
    `https://openlibrary.org/search.json?q=${title}&limit=1`
  );
  const book_id = bookData.data.docs[0].cover_i;
  const author = bookData.data.docs[0].author_name[0];
  await Book.addNewBook(
    author,
    title,
    description,
    rating,
    genre,
    date,
    book_id
  );
  res.redirect("/");
};
