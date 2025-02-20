import express from "express";
import * as authController from "../controllers/authController.js"

const router = express.Router();

// GET routes

router.get("/signIn", authController.getSignIn)

// POST routess

router.post("/signIn",authController.signInUser);
router.post("/register",authController.registerUser);
router.post("/signOut", authController.signOutUser)

export default router;

