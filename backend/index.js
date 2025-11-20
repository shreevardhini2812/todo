import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db.js";
import todoRoutes from "./routes/todoRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use("/api/todos", todoRoutes);
const allowedOrigins = [
  "https://mellifluous-puppy-efc100.netlify.app/",
  "http://localhost:5000"
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) callback(null, true);
    else callback(new Error("CORS not allowed"));
  }
}));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
