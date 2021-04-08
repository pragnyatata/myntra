const express = require("express");
const { create, getUserById, bookSlot, login } = require("../Contollers/User");
const router = express.Router();
router.post("/login", login);
router.post("/create", create);
router.get("/userinfo/:id", getUserById);
router.post("/slotbook/:scheduleId/:userId", bookSlot);
module.exports = router;
