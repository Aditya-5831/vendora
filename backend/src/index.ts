import express from "express";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3001;

// middleware
app.use(express.json());
app.use(cors());

// Server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
