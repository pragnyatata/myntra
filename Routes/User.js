const express = require("express");
const { create, getUserById } = require("../Contollers/User");
const router = express.Router();

router.post("/create", create);
router.get("/userinfo/:id", getUserById);
module.exports = router;
