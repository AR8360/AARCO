//importing npm packages
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";

// importing js files
import dbConnect from "./database/dbConnect.js";
import userRouter from "./route/user.route.js";
import newsRouter from "./route/news.route.js";
dotenv.config();

// Create express app
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("<h1>Server is running</h1>");
});
app.use("/user", userRouter);
app.use("/news", newsRouter);

// Database connection
dbConnect()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB connection failed", error.message);
    process.exit(1);
  });
