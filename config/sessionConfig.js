import session from "express-session";
import { Sequelize } from "sequelize";
import connectSessionSequelize from "connect-session-sequelize";
import dotenv from "dotenv";


dotenv.config();

// Initialize Sequelize 
const sequelize = new Sequelize(`postgres://postgres:${process.env.DB_PASS}@localhost:5432/bookstore`);
try {
    await sequelize.authenticate();
    console.log('Database connection established.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
};
// Define the session store
const SequelizeStore = connectSessionSequelize(session.Store);

const sessionStore = new SequelizeStore({
    db:sequelize
});



const sessionMiddleWare = session({
    secret: process.env.SESSION_SECRET || "default_secret",
    resave: false,
    saveUninitialized: false,
    store:sessionStore,
    cookie: {
      secure: process.env.NODE_ENV === "production", // only use secure cookies in production
      maxAge: 1000 * 60 * 60, // 1 hour
    },
  });
  // Sync session store with the database
sessionStore.sync();

const isAuthenticated = (req, res, next) => {
  if (req.session.user) {
    return next();
  }
  res.redirect("/signIn");
};

export { sessionMiddleWare, isAuthenticated };
