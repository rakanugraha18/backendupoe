import express from "express";
import cors from "cors";
import session from "express-session";
import passport from "./config/passport.js";
import userRoutes from "./routes/user.routes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setup session (dibutuhkan oleh Passport)
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api/users", userRoutes);

export default app;
