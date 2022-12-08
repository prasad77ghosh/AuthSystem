import app from "./app.js";
import dotenv from "dotenv";
import connectDB from "./config/database.js";


//handling uncought expection
process.on("uncaughtException", (error) => {
  console.log(`Error: ${error.message}`);
  console.log("Shutting down the server due to uncought exception");
  process.exit(1);
});


dotenv.config({ path: "backend/config/config.env" });

connectDB();

const PORT = process.env.PORT || 3300;

app.listen(PORT, () => {
  console.log(`Server listen on PORT :- ${PORT}`);
});

// unHandled promise rejection
process.on("uncaughtException", (error) => {
  console.log(`Error: ${error}`);
  console.log("Shutting down the server due to unhandled promise rejection");
  server.close(() => {
    process.exit(1);
  });
});