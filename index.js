import express from "express";
import bookRoutes from "./routes/bookRoutes.js";


const app = express();
const port = 3000;

// Middlewares

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

// Routes

app.use("/", bookRoutes);
app.use("/addBook", bookRoutes);
app.use("/favourites", bookRoutes);
app.use("/book/:id", bookRoutes );
app.use("/sortBy", bookRoutes)
app.use("/search", bookRoutes);
app.use("/all", bookRoutes)
app.use("/addToFavourites", bookRoutes)
app.use("/addBook-form",bookRoutes);
app.use("/editBook/:id", bookRoutes)
app.use("/deleteBook/:id", bookRoutes)


// Server set up
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
