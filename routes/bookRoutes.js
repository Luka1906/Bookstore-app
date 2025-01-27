import express from "express";
import * as bookController from "../controllers/bookController.js";
import * as sortController from "../controllers/sortController.js"
const router = express.Router();

router.get("/", bookController.getAllBooks);
router.get("/addBook", bookController.addNewBook);
router.get("/collection",bookController.getCollection);
router.get("/book/:id", bookController.getBook);
router.post("/sortBy", sortController.getSortedBooks)



export default router;