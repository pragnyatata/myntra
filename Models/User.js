const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  insiderPoints: {
    type: Number,
    default: 1000,
  },
  socketId: {
    type: String,
  },
  room: {
    type: String,
  },
  role: {
    type: String,
    default: "user",
  },
  phoneNumber: {
    type: Number,
  },
});
module.exports = User = mongoose.model("User", UserSchema);
