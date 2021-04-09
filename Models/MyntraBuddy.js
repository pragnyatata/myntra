const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BuddySchema = new mongoose.Schema({
  queue: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],
});
module.exports = Buddy = mongoose.model("Buddy", BuddySchema);
