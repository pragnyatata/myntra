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
    default: 0,
  },
});
module.exports = User = mongoose.model("User", UserSchema);
