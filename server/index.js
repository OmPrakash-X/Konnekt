import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { ConnectDB } from "./configs/db.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173"],
  })
);
app.use(express.json());

const port = process.env.PORT || 5000;

app.listen(port, () => {
  ConnectDB();
  console.log(`Server is running at ${port}`);
});
