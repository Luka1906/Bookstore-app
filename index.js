import express from "express";
import bookRoutes from "./routes/bookRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { sessionMiddleWare, sessionUser } from "./config/sessionConfig.js";

const app = express();
const port = 3000;

// Middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(sessionMiddleWare);
app.use(sessionUser)

app.use(express.static("public"));

// Routes

// Book Routes

app.use(bookRoutes);

// Auth Routes

app.use(authRoutes);

// Server set up
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
