import db from "../config/db.js";

export const getBooks = async (limit,offset) => {
  
  const result = await db.query("SELECT * FROM books ORDER BY rating DESC LIMIT $1 OFFSET $2", [limit,offset]);
  const totalBooks = await db.query('SELECT COUNT(*) FROM books');

  return { rows: result.rows, rowCount: totalBooks.rows[0].count};
};

export const getCarouselBooks = async () => {
  const result = await db.query("SELECT * FROM books ORDER BY id LIMIT 5");

  return result.rows;
};

export const getBook = async (id) => {
  const result = await db.query("SELECT * FROM books WHERE book_id=$1", [id]);
  return result.rows;
};

export const getFavourites = async () => {
  const result = await db.query("SELECT * FROM books WHERE favourite=true");
  return result.rows;
};

export const addNewBook = async (
  author,
  title,
  description,
  rating,
  category,
  date,
  book_id
) => {
  await db.query(
    "INSERT into books (author, title, description, rating, category, favourite, date, book_id) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)",
    [author,title,description,rating,category,null, date,book_id]
  );
};
