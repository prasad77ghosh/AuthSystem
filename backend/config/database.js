const mongoose = require("mongoose");
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connectDB = () => {
  mongoose
    .connect(process.env.DB_URL, options)
    .then((data) => {
      console.log(`MongoDB connected to the server: ${data.connection.host}`);
    })
    .catch((error) => {
      console.log(error.message);
    });
};

module.exports = connectDB;
