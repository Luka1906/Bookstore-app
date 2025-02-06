import db from "../config/db.js";

export const updateFavouriteBook = async (id,addToFavorites) => {
    console.log(addToFavorites)
    if(addToFavorites === true) {
        const result = await db.query("UPDATE books SET favourite=true WHERE book_id=$1 RETURNING *", [id]);
        console.log(result.rows)
        return result.rows[0];
    } else {
        const result = await db.query("UPDATE books SET favourite=false WHERE book_id=$1 RETURNING *", [id]);
        console.log(result.rows)
        return result.rows[0];
    }



}