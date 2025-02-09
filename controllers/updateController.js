import * as Book from "../models/updateModel.js";

export const updateFavouriteBooks = async (req,res) => {
    const {id,addToFavorites} = req.body;
    console.log(id);
    console.log(addToFavorites)
    const updatedBook = await Book.updateFavouriteBook(id,addToFavorites);
    res.json({favourite:addToFavorites})
};

export const editBook = async (req, res) => {
    const {newDescription} = req.body;
    const {id} = req.params
    const editedBook = await Book.editBook(id,newDescription);
    const editedDescription =editedBook.description
    res.json({editedDescription})
};

export const deleteBook = async (req,res) => {
    const {id} = req.params;
    const deletedBook = await Book.deleteBook(id);
    console.log(deletedBook)
    if (deletedBook) {
        res.json({deletedBook: true})
    } else {
        res.json({deletedBook: false})
    }
  

}