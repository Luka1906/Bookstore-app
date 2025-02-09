import db from "../config/db.js";

export const updateFavouriteBook = async (id, addToFavorites) => {
  console.log(addToFavorites);
  if (addToFavorites === true) {
    const result = await db.query(
      "UPDATE books SET favourite=true WHERE book_id=$1 RETURNING *",
      [id]
    );
    console.log(result.rows);
    return result.rows[0];
  } else {
    const result = await db.query(
      "UPDATE books SET favourite=false WHERE book_id=$1 RETURNING *",
      [id]
    );
    console.log(result.rows);
    return result.rows[0];
  }
};

export const editBook = async(id,newDescription) => {
    const result = await db.query("UPDATE books SET description = $1 WHERE book_id=$2 RETURNING *",[newDescription,id]);
    return result.rows[0]
}

export const deleteBook = async(id) => {
    const result = await db.query("DELETE from books WHERE book_id = $1 RETURNING *", [id]);
    return result.rows[0]
}

