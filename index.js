const express = require("express");
const connectDB = require("./Config/db");
const path = require("path");
const app = express();
const cors = require("cors");

const scheduleRoutes = require("./Routes/Schedule");
const userRoutes = require("./Routes/User");
connectDB();

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

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
