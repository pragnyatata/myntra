const mongoose = require("mongoose");
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
});
module.exports = Schedule = mongoose.model("Schedule", ScheduleSchema);
