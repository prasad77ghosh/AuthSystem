import express from "express";
import cookieParser from "cookie-parser";
import errorMiddleware from "./middlewares/Error.js";
import AuthRouter from "./routes/AuthRoute.js";
import cors from "cors";
import session from "express-session";
import connectStore from "connect-mongo";
import mongoose from "mongoose";

const app = express();
const MongoStore = connectStore(session);

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cors({origin: allowledDomains, credentials: true}));
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
      ttl: parseInt(SESS_LIFETIME) / 1000,
    }),
    cookie: {
      sameSite: true,
      secure: NODE_ENV === "production",
      maxAge: parseInt(SESS_LIFETIME),
    },
  })
);

//routes
app.use("/auth_api/v1", AuthRouter);

app.use(errorMiddleware);
export default app;
