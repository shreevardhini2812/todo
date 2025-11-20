import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db.js";
import todoRoutes from "./routes/todoRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use(cors({
  origin: [
    "https://mellifluous-puppy-efc100.netlify.app",
    "http://localhost:5000"
  ],
  credentials: true
}));
app.use("/todos", todoRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
