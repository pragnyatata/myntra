const express = require("express");
const connectDB = require("./Config/db");
const path = require("path");
const app = express();
const cors = require("cors");
const server = require("http").createServer(app);
const scheduleRoutes = require("./Routes/Schedule");
const userRoutes = require("./Routes/User");
const socketIo = require("socket.io");
const { getUserBySocketId, addSocketId } = require("./Contollers/User");
connectDB();

const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
app.use(express.json({ extended: false }));
app.use(cors());
app.use("/api/schedule", scheduleRoutes);
app.use("/api/user", userRoutes);
if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 8000;
io.on("connection", (socket) => {
  socket.on("join", async ({ userId, room }, callback) => {
    console.log("HEre is ur room ni", room);

    const { error, user } = await addSocketId(userId, socket.id, room);
    if (error) return callback(error);
    socket.join(room);

    socket.emit("message", {
      user: "admin",
      text: `${user.name}, welcome to room ${room}.`,
    });
    socket.broadcast
      .to(room)
      .emit("message", { user: "admin", text: `${user.name} has joined!` });

    callback();
  });
  socket.on("sendMessage", async (message, callback) => {
    const user = await getUserBySocketId(socket.id);
    console.log(user);
    io.in(user.room).emit("message", { user: user.name, text: message });
    callback();
  });

  socket.on("disconnect", () => {
    console.log("User left");
  });
});

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
