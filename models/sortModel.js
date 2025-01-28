import db from "../config/db.js";

export const sortBooks= async (sortBy) => {
    const result = await db.query(`SELECT * FROM books ORDER BY ${sortBy} ASC`);
    return result.rows
}
