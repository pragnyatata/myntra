const mongoose = require("mongoose");
const BuddySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});
module.exports = Buddy = mongoose.model("Buddy", BuddySchema);
