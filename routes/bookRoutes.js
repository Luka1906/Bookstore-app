import express from "express";
import * as bookController from "../controllers/bookController.js";
import * as sortController from "../controllers/sortController.js";
import * as updateController from "../controllers/updateController.js";
import * as authenticationController from "../controllers/authenticationController.js"
const router = express.Router();

// GET routes

router.get("/", bookController.getAllBooks);
router.get("/addBook", bookController.newBook);
router.get("/favourites",bookController.getCollection);
router.get("/book/:id", bookController.getBook);
router.get("/sortBy", sortController.getSortedBooks);
router.get("/search", sortController.getSearchedBook);
router.get("/all", sortController.getAllCollection );
router.get("/signIn",authenticationController.getSignIn)

// PUT routes
router.put("/addToFavourites", updateController.updateFavouriteBooks);
router.put("/editBook/:id", updateController.editBook)

// POST routess
router.post("/addBook-form", bookController.addNewBook)

// DELETE routes
router.delete("/deleteBook/:id",updateController.deleteBook)




export default router;