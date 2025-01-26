import express from "express";
import * as bookController from "../controllers/bookController.js";
const router = express.Router();

router.get("/", bookController.getAllBooks);
router.get("/addBook", bookController.addNewBook);
router.get("/collection",bookController.getCollection);
router.get("/book/:id", bookController.getBook)


export default router;