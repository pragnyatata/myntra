const Schedule = require("../Models/Schedule");
const User = require("../Models/User");
const Buddy = require("../Models/MyntraBuddy");
const { sendEmail } = require("../Middleware/Mailer");
const moment = require("moment");
exports.login = async (req, res) => {
  const { email } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }
    return res.status(200).json({ user });
  } catch (err) {
    console.log(err.message);
    if (err) return res.status(500).json({ error: "Something went wrong" });
  }
};
exports.create = async (req, res) => {
  const { name, email, insiderPoints, role } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (user !== null)
      return res
        .status(500)
        .json({ error: "User with same email already exists" });
    const newUser = User({ name, email, insiderPoints, role });
    await newUser.save();
    return res.status(200).json({ msg: "User Created" });
  } catch (err) {
    console.log(err.message);
    if (err) return res.status(500).json({ error: "Something went wrong" });
  }
};
exports.addSocketId = async (userId, socketId, room) => {
  try {
    const user = await User.findById(userId);
    user.socketId = socketId;
    user.room = room;
    await user.save();
    return { user };
  } catch (err) {
    if (err) return { error: "Something went wrong" };
  }
};
exports.getUserBySocketId = async (id) => {
  try {
    const user = await User.findOne({ socketId: id });
    return user;
  } catch (err) {
    if (err) return { error: "Something went wrong" };
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
      };
      schedule.userSlots.push(slotDetails);
      const saved = await schedule.save();
      user.insiderPoints -= schedule.insiderPoints;
      user.phoneNumber = req.body.phoneNumber;
      const finalResponse = await user.save();
      content = `<h2>Thank You For Booking Slot with ${
        schedule.influencerName
      }</h2>
      <p> Join the Live at ${moment(schedule.beginTime).format(
        "HH:mm"
      )} on ${moment(schedule.date).format(
        "DD/MM/YY"
      )}. Moderator will add you to the stream</p>
      <p>Join <a href=${schedule.restreamUrl}>Here</a></p>
      `;
      const resp = await sendEmail(user.email, content);
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
exports.createBuddy = async (req, res) => {
  try {
    const queue = [];
    const newBuddy = Buddy({ queue });
    const user = await newBuddy.save();
    return res.status(200).json(user);
  } catch (err) {
    console.log(err.message);
    if (err) return res.status(500).json({ error: "Something went wrong" });
  }
};
exports.pushBuddy = async (req, res) => {
  try {
    const buddies = await Buddy.find().populate("queue.user");
    let myBuddy = buddies[0];
    const userBuddy = await User.findById(req.params.id);
    let index = myBuddy.queue.findIndex(
      (el) => el._id.toString() === userBuddy._id.toString()
    );
    if (index === -1) myBuddy.queue.push(userBuddy);
    console.log(index);
    const result = await myBuddy.save();
    return res.status(200).json(result);
  } catch (err) {
    console.log(err.message);
    if (err) return res.status(500).json({ error: "Something went wrong" });
  }
};
exports.buddyCount = async (req, res) => {
  try {
    const buddies = await Buddy.find().populate("queue.user");
    let myBuddy = buddies[0];
    length = myBuddy.queue.length;
    if (length === 0) return res.status(200).json({ length });
    let id = myBuddy.queue.shift()._id.toString();
    console.log(id);
    await myBuddy.save();
    return res.status(200).json({ length, id });
  } catch (err) {
    console.log(err.message);
    if (err) return res.status(500).json({ error: "Something went wrong" });
  }
};
