import * as Book from "../models/updateModel.js";

export const updateFavouriteBooks = async (req,res) => {
    const {id,addToFavorites} = req.body;
    console.log(id);
    console.log(addToFavorites)
    const updatedBook = await Book.updateFavouriteBook(id,addToFavorites);
    res.json({favourite:addToFavorites})
}