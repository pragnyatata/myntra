const mongoose = require("mongoose");
const config = require("config");
const db =
  "mongodb+srv://pragnya:pragnya@cluster0.17ave.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log("Database connected");
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};
module.exports = connectDB;
