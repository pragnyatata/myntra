const express = require("express");
const { create, getUserById, bookSlot } = require("../Contollers/User");
const router = express.Router();

router.post("/create", create);
router.get("/userinfo/:id", getUserById);
router.post("/slotbook/:scheduleId/:userId", bookSlot);
module.exports = router;
