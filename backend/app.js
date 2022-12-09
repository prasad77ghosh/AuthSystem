import express from "express";
import cookieParser from "cookie-parser";
import errorMiddleware from "./middlewares/Error.js";
import AuthRouter from "./routes/AuthRoute.js";
import cors from "cors";
import session from "express-session";
import connectStore from "connect-mongo";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: "backend/config/config.env" });
const app = express();
const MongoStore = connectStore(session);

app.use(
  cors({
    credentials: true,
    origin: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    name: process.env.SESS_NAME,
    secret: process.env.SESS_SECRET,
    saveUninitialized: false,
    resave: false,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      collection: "session",
      ttl: parseInt(process.env.SESS_LIFETIME) / 1000,
    }),
    cookie: {
      sameSite: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: parseInt(process.env.SESS_LIFETIME),
    },
  })
);

//routes
app.use("/auth_api/v1", AuthRouter);

app.use(errorMiddleware);
export default app;
