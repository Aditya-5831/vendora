import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import errorHandler from "./middlewares/error.middleware";

const app = express();
const port = process.env.PORT || 3001;

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/v1/auth", authRoutes);

// Error handler middleware
app.use(errorHandler);

// Server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
