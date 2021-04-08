const express = require("express");
const {
  create,
  list,
  update,
  deleteSchedule,
} = require("../Contollers/Schedule");
const router = express.Router();

router.post("/create", create);
router.get("/list", list);
router.put("/update/:id", update);
router.delete("/delete/:id", deleteSchedule);
module.exports = router;
