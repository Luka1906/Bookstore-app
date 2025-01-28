import * as Books from "../models/sortModel.js";

export const getSortedBooks= async (req,res) => {
    try {
        const sortBy = req.query.option;
        const books = await Books.sortBooks(sortBy);
        res.json({bookSorted:books});
    } catch (error) {
        res.status(500).send("Error sorting books")
    }

}