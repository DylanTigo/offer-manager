import express, { json } from "express";
import errorHandler from "./middlewares/errorHandler.js"
import { connectToDb } from "./config/connectDB.js";
import dotenv from "dotenv"

dotenv.config()
connectToDb();
const app = express();
const port = process.env.PORT || 3000;

app.use(json());
app.use(errorHandler)

app.listen(port, () => console.log(`Server is listening on ${port}`));
