import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db.js";
import todoRoutes from "./routes/todoRoutes.js";

dotenv.config();
connectDB();

const app = express();

const allowedOrigins = [
  "https://mellifluous-puppy-efc100.netlify.app/",
  "http://localhost:5173"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // allow Postman / server-to-server
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log("Blocked CORS origin:", origin);
      callback(new Error("CORS not allowed"));
    }
  }
}));
app.use("/todos", todoRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
