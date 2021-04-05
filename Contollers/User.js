const Schedule = require("../Models/Schedule");
const User = require("../Models/User");
exports.create = async (req, res) => {
  const { name, email, insiderPoints } = req.body;
  try {
    const newUser = User({ name, email, insiderPoints });
    const user = await newUser.save();
    return res.status(200).json(user);
  } catch (err) {
    console.log(err.message);
    if (err) return res.status(500).json({ error: "Something went wrong" });
  }
};
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    return res.status(200).json(user);
  } catch (err) {
    console.log(err.message);
    if (err) return res.status(500).json({ error: "Something went wrong" });
  }
};
var updatingNetwork = false;
exports.bookSlot = async (req, res) => {
  if (updatingNetwork) {
    return res.status(409).send("Try later");
  }
  updatingNetwork = true;
  try {
    let schedule = await Schedule.findById(req.params.scheduleId).populate();
    let user = await User.findById(req.params.userId);

    if (
      schedule.userSlots.findIndex(
        (el) => el.user.toString() === user._id.toString()
      ) !== -1
    ) {
      updatingNetwork = false;
      return res
        .status(200)
        .json({ message: "You have a slot booked already" });
    }

    if (schedule.userSlots.length < schedule.slots) {
      const slotDetails = {
        user: user,
        details: req.body.details,
        phoneNumber: req.body.phoneNumber,
      };
      schedule.userSlots.push(slotDetails);

      const saved = await schedule.save();
      user.insiderPoints -= schedule.insiderPoints;
      const finalResponse = await user.save();
      updatingNetwork = false;
      return res.status(200).json(saved);
    } else {
      updatingNetwork = false;
      return res.status(200).json({ message: "Slots Filled" });
    }
  } catch (err) {
    console.log(err.message);
    if (err) return res.status(500).json({ error: "Something went wrong" });
  }
};
