import express from "express";
import cors from "cors";
import session from "express-session";
import passport from "./config/passport.js";
import cookieParser from "cookie-parser";
import helmet from "helmet"; // ⬅️ Keamanan tambahan
import morgan from "morgan"; // ⬅️ Logging request
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import errorHandler from "./middleware/error.middleware.js";

const app = express();

// 🔹 Middleware keamanan
app.use(helmet());

// 🔹 Middleware logging
app.use(morgan("dev"));

// Middleware untuk CORS
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);

// Middleware untuk body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// 🔹 Middleware untuk session
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secretkey",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: "strict",
    },
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Routes

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

// Middleware untuk error handling
app.use(errorHandler);

export default app;
