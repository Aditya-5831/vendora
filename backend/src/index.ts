import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import errorHandler from "./middlewares/error.middleware";
import cookieParser from "cookie-parser";

const app = express();
const port = process.env.PORT || 3001;

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);

// Error handler middleware
app.use(errorHandler);

// Server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
