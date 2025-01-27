import db from "../config/db.js";

export const sortByRating = async () => {
    const result = await db.query("SELECT * FROM books ORDER BY rating ASC");
    console.log(result.rows);
    return result.rows
}
