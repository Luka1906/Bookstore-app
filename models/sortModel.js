import db from "../config/db.js";

export const sortBooks = async (sortBy, sortByGenre ) => {
    let orderBy = "rating DESC"; // Default sorting

    if (sortByGenre) {
        console.log(typeof sortByGenre)
        const result = await db.query(
            "SELECT * FROM books WHERE EXISTS (SELECT 1 FROM unnest(category) AS cat WHERE cat ILIKE $1)",
            [`%${sortByGenre}%`]
          );
          
          
        return result.rows
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
  
    const result = await db.query(`SELECT * FROM books ORDER by ${orderBy}`)
    return result.rows;
};

export const getCollection = async () => {
    const result = await db.query("SELECT * FROM books ORDER BY title ")
    return result.rows;
}
