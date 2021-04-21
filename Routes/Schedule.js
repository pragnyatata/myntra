const express = require("express");
const {
  create,
  list,
  update,
  deleteSchedule,
  slotsInfo,
  mailToInfluencer,
} = require("../Contollers/Schedule");
const router = express.Router();

router.post("/create", create);
router.get("/list", list);
router.put("/update/:id", update);
router.delete("/delete/:id", deleteSchedule);
router.get("/slotsInfo/:id", slotsInfo);
router.get("/mailToInfluencer/:id", mailToInfluencer);

module.exports = router;
