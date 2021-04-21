const express = require("express");
const {
  create,
  list,
  update,
  deleteSchedule,
  slotsInfo,
} = require("../Contollers/Schedule");
const router = express.Router();

router.post("/create", create);
router.get("/list", list);
router.put("/update/:id", update);
router.delete("/delete/:id", deleteSchedule);
router.get("/slotsInfo/:id", slotsInfo);
module.exports = router;
