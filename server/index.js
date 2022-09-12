import express, { json } from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

import authRoute from "./routes/auth.js";

dotenv.config();

const app = express();

// Constants
const PORT = process.env.PORT ?? 5000;
const DB_URI = process.env.DB_URI ?? "";

// MiddleWare
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(json());

// Routes
app.use("/api/auth", authRoute);

app.get("/", (req, res) => {
  return res.json({ message: "Hello World!" });
});

// Error Handler

app.use((err, req, res, next) => {
  const { status = 500, message, stack } = err;

  // handle mongodb wrong id
  if (message && ~message.indexOf("Cast to ObjectId failed")) {
    res.sendStatus(404);
  }

  res.json({
    status,
    message,
    stack,
  });
});

const start = async () => {
  try {
    await mongoose.connect(DB_URI);
    app.listen(PORT, () => {
      console.log(`⚡️[server]: Server is running on PORT = ${PORT}`);
    });
  } catch (e) {
    console.error(e);
  }
};

start();
