import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/dbConfig.js";

import userRouter from "./routes/userRoutes.js";
import taskRouter from "./routes/taskRoutes.js";

const app = express();
app.use(express.json());

dotenv.config();

connectDb();

const PORT = process.env.PORT || 5000;

app.use("/api/auth", userRouter);
app.use("/api/task", taskRouter);

app.listen(PORT, () => {
  console.log(`Server listning on port ${PORT}`);
});
