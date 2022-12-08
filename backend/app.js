import express from "express";
import cookieParser from "cookie-parser";
import errorMiddleware from "./middlewares/Error.js";
import AuthRouter from "./routes/AuthRoute.js";

const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());

//routes
app.use("/auth_api/v1", AuthRouter);

app.use(errorMiddleware);
export default app;
