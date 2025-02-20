import session from "express-session";
import pgSession from "connect-pg-simple";
import dotenv from "dotenv";

dotenv.config();

// Initialize PostgreSQL Session Store
const PgSession = pgSession(session);
const sessionStore = new PgSession({
  conObject: {
    connectionString: `postgres://postgres:${process.env.DB_PASS}@localhost:5432/bookstore`,
  },
  tableName: "session", // Default table is 'session'
});

// Session Middleware Configuration
const sessionMiddleWare = session({
  secret: process.env.SESSION_SECRET || "default_secret",
  resave: false, // Don't resave session if unchanged
  saveUninitialized: false, // Don't save empty sessions
  store: sessionStore,
  cookie: {
    secure:false,// Only use secure cookies in production
    httpOnly: true, // Prevent client-side JavaScript access
    maxAge: 1000 * 60 * 60, // 1 hour session duration
  },
});

// Middleware for authentication
const isAuthenticated = (req, res, next) => {
  if (req.session.user) {
    return next();
  }
  res.redirect("/signIn");
};

// Middleware to make session user available in views
const sessionUser = (req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
};

export { sessionMiddleWare, isAuthenticated, sessionUser };
