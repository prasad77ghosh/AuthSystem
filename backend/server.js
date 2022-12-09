const express = require("express");
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middlewares/Error");
const AuthRouter = require("./routes/AuthRoute");
const cors = require("cors");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const dotenv = require("dotenv");
const connectDB = require("./config/database");

dotenv.config({ path: "backend/config/config.env" });

const app = express();

connectDB();

app.use(
  cors({
    credentials: true,
    origin: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// setting up connect-mongodb-session store
const mongoDBstore = new MongoDBStore({
    uri: process.env.DB_URL,
    collection: "mySessions"
});

mongoDBstore.on("connected", () => console.log("mongoDBstore Connected"));
mongoDBstore.on("error", () => console.log("mongoDBstore not connected"));

app.use(
  session({
    name: process.env.SESS_NAME,
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: false,
    store: mongoDBstore,
    proxy: false, // this should be true for session to be work on heroku
    cookie: {
      maxAge: 1000 * 60 * 60 * 3, // Three hours
      sameSite: false,
      secure: process.env.NODE_ENV === "production",
    },
  })
);

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept,Authorization"
//   );
//   res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE");
//   next();
// });


//handling uncought expection
process.on("uncaughtException", (error) => {
  console.log(`Error: ${error.message}`);
  console.log("Shutting down the server due to uncought exception");
  process.exit(1);
});


const PORT = process.env.PORT || 3300;


app.use("/auth_api/v1", AuthRouter);

app.listen(PORT, () => {
  console.log(`Server listen on PORT :- ${PORT}`);
});


app.use(errorMiddleware);

// unHandled promise rejection
process.on("uncaughtException", (error) => {
  console.log(`Error: ${error}`);
  console.log("Shutting down the server due to unhandled promise rejection");
  server.close(() => {
    process.exit(1);
  });
});
