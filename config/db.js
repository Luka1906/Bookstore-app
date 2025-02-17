import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const db = new pg.Client({
  user: "postgres",
  database: "bookstore",
  host: "localhost",
  port: 5432,
  password: process.env.DB_PASS,
});


db.connect();

export default db;
