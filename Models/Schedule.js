const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ScheduleSchema = new mongoose.Schema({
  date: {
    type: Date,
  },
  beginTime: {
    type: String,
  },
  endTime: {
    type: String,
  },
  influencerEmail: {
    type: String,
    required: true,
  },
  influencerName: {
    type: String,
    required: true,
  },
  slots: {
    type: Number,
    default: 6,
  },
  insiderPoints: {
    type: Number,
    default: 10,
  },
  url: {
    type: String,
  },
  restreamUrl: {
    type: String,
  },
  userSlots: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      details: {
        type: String,
      },
    },
  ],
});
module.exports = Schedule = mongoose.model("Schedule", ScheduleSchema);
