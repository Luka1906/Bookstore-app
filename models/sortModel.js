import db from "../config/db.js";

export const sortBooks = async (sortBy, sortByGenre ) => {
    let orderBy = "rating DESC"; // Default sorting
    let query = "SELECT * FROM books";
    let params = [];
  
    if (sortByGenre) {
      query += " WHERE category ILIKE $1";
      params.push(`%${sortByGenre}%`);
    }
  
    switch (sortBy) {
      case "rating":
        orderBy = "rating DESC";
        break;
      case "date":
        orderBy = "date DESC";
        break;
      case "title":
        orderBy = "title ASC";
        break;
        default:
        orderBy = "rating ASC"
    }
  
    query += ` ORDER BY ${orderBy}`;
  
    const result = await db.query(query, params);
    return result.rows;
};

export const getCollection = async () => {
    const result = await db.query("SELECT * FROM books ORDER BY title ");
    return result.rows;
}
