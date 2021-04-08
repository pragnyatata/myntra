const Schedule = require("../Models/Schedule");
exports.create = async (req, res) => {
  try {
    const {
      date,
      beginTime,
      endTime,
      influencerEmail,
      slots,
      insiderPoints,
      url,
      influencerName,
    } = req.body;
    const newSchedule = Schedule({
      date,
      beginTime,
      endTime,
      influencerEmail,
      slots,
      insiderPoints,
      url,
      influencerName,
    });
    const schedule = await newSchedule.save();
    return res.status(200).json(schedule);
  } catch (err) {
    console.log(err.message);
    if (err) return res.status(500).json({ error: "Something went wrong" });
  }
};
exports.list = async (req, res) => {
  try {
    const schedules = await Schedule.find().sort({ date: -1 });
    return res.status(200).json(schedules);
  } catch (error) {
    console.log(err.message);
    if (err) return res.status(500).json({ error: "Something went wrong" });
  }
};
exports.update = async (req, res) => {
  try {
    let schedule = await Schedule.findById(req.params.id);
    const {
      date,
      beginTime,
      endTime,
      influencerEmail,
      slots,
      insiderPoints,
      url,
      influencerName,
    } = req.body;
    schedule.date = date;
    schedule.beginTime = beginTime;
    schedule.endTime = endTime;
    schedule.influencerEmail = influencerEmail;
    schedule.slots = slots;
    schedule.insiderPoints = insiderPoints;
    schedule.url = url;
    schedule.influencerName = influencerName;
    schedule = await schedule.save();
    return res.status(200).json(schedule);
  } catch (err) {
    console.log(err.message);
    if (err) return res.status(500).json({ error: "Something went wrong" });
  }
};
exports.deleteSchedule = async (req, res) => {
  try {
    let schedule = await Schedule.findById(req.params.id);
    await schedule.remove();
    return res.status(200).json({ msg: "Schedule removed" });
  } catch (err) {
    console.log(err.message);
    if (err) return res.status(500).json({ error: "Something went wrong" });
  }
};
