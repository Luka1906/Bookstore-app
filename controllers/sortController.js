import * as Book from "../models/sortModel.js";

export const getSortedBooks= async (req,res) => {
    try {
        const sortBy = req.query.option;
        const sortByGenre = req.query.genre;
        const books = await Book.sortBooks(sortBy, sortByGenre);

        res.json({bookSorted:books});
    } catch (error) {
        res.status(500).send("Error sorting books")
    }

};

export const getAllCollection = async (req,res) => {
    try {
      const collection = await Book.getCollection();
      res.json({collection})
    } catch (error) {
      res.status(500).send("Error fetching books");
    }
  }

  export const getSearchedBook  = async (req,res) => {
    const query = req.query.q;
    console.log(query)
    if (!query) res.json([]);

    try {
      const books= await Book.searchedBook(query);
    
      res.json(books)
    } catch (error) {
      res.status(500).json({error:"Error fetching books"})
    }
  }