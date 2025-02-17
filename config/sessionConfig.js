import session from "express-session";
import db from "./db";

const sessionMiddleWare = session({
  secret: "Jocaubica1906!",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, 
    maxAge: 1000 * 60 * 60, // 1 hour
  },
});

export default sessionMiddleWare;
