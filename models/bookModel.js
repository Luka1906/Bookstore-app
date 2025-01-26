import db from "../config/db.js";

export const getBooks = async () => {
  const result = await db.query("SELECT * FROM books");

  return {rows:result.rows, rowCount:result.rowCount}
};

export const getCarouselBooks = async () => {
  const result = await db.query("SELECT * FROM books ORDER BY id LIMIT 5");

  return result.rows;
};

export const getBook = async (id) => {
  const result = await db.query ("SELECT * FROM books WHERE book_id=$1", [id]);
  return result.rows;
}

// let books = [];
// let id = [];
// app.get("/", async (req, res) => {
//   const result = await db.query("SELECT * FROM books");
//   const api = await axios.get(
//     "https://openlibrary.org/search.json?title=War+and+Peace"
//   );
//   console.log(api.data);

//   //   console.log(result1.data)
//   books = result.rows;

//   console.log(books.book_id);

//   res.render("index.ejs", { books, id });
// });
