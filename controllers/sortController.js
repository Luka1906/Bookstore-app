import * as Books from "../models/sortModel.js";

export const getSortedBooks= async (req,res) => {
    try {
        const sortBy = req.query.option;
        console.log("luka car")
        const books = await Books.sortByRating();
        res.render("index.ejs", {booksByRating: books});
    } catch (error) {
        res.status(500).send("Error sorting books")
    }

}