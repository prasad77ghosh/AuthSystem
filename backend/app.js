import express from "express";
import cookieParser from "cookie-parser";
import errorMiddleware from "./middlewares/Error.js";

const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());

app.use(errorMiddleware);
export default app;
