import * as Book from "../models/updateModel.js";

export const updateFavouriteBooks = async (req,res) => {
    const {id} = req.body;
    const updatedBook = await Book.updateFavouriteBook(id);
    res.json({updatedBook})
}