import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/dbConfig.js";

const app = express();
app.use(express.json());

dotenv.config();

connectDb();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listning on port ${PORT}`);
});
