import express from "express";
import bookRoutes from "./routes/bookRoutes.js";
import axios from "axios";

const app = express();
const port = 3000;

// Middlewares

app.use(express.static("public"));
app.use(express.json());

// Routes

app.use("/", bookRoutes);
app.use("/addBook", bookRoutes);
app.use("/favourites", bookRoutes);
app.use("/book:id", bookRoutes );
app.use("/sortBy", bookRoutes)
app.use("/addToFavourites", bookRoutes)

// Server set up
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
