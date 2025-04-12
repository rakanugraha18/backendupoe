import express from "express";
import cors from "cors";
import session from "express-session";
import passport from "./config/passport.js";
import cookieParser from "cookie-parser";
import helmet from "helmet"; // ⬅️ Keamanan tambahan
import morgan from "morgan"; // ⬅️ Logging request
import errorHandler from "./middleware/error.middleware.js";
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import topicRoutes from "./routes/topic.routes.js";
import wordRoutes from "./routes/word.routes.js";
import quizRoutes from "./routes/quiz.routes.js";
import quizAttemptRoutes from "./routes/quizAttempt.routes.js";
import MongoStore from "connect-mongo";

const app = express();

// 🔹 Middleware keamanan
app.use(helmet());

// 🔹 Middleware logging
app.use(morgan("dev"));

// Middleware untuk CORS
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5000",
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
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI, // <- pastikan ini ada di .env
      collectionName: "sessions",
    }),
    cookie: {
      secure: process.env.NODE_ENV === "production", // true di render
      httpOnly: true,
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 24, // 1 hari
    },
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.get("/api/session", (req, res) => {
  res.json({
    authenticated: req.isAuthenticated?.() || false,
    session: req.session,
    user: req.user || null,
  });
});

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api", wordRoutes, topicRoutes);
app.use("/api/quiz", quizRoutes, quizAttemptRoutes);

// Middleware untuk error handling
app.use(errorHandler);

export default app;
