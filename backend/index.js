import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import todoRoutes from "./routes/todoRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());

// ------------------ FIXED CORS CONFIG ------------------
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://mellifluous-puppy-efc100.netlify.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: false,
}));

// Handle preflight requests
app.options("/", cors());
// --------------------------------------------------------

// Test route
app.get("/test", (req, res) => res.send("Backend is running!"));

// Todos routes
app.use("/todos", todoRoutes);

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Dynamic port for Render
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
