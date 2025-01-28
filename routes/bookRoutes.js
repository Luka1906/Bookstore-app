import express from "express";
import * as bookController from "../controllers/bookController.js";
import * as sortController from "../controllers/sortController.js";
import * as updateController from "../controllers/updateController.js"
const router = express.Router();

// GET routes

router.get("/", bookController.getAllBooks);
router.get("/addBook", bookController.addNewBook);
router.get("/favourites",bookController.getCollection);
router.get("/book/:id", bookController.getBook);
router.get("/sortBy", sortController.getSortedBooks);

// PUT routes
router.put("/addToFavourites", updateController.updateFavouriteBooks)




export default router;