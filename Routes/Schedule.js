const express = require("express");
const { create, list, update } = require("../Contollers/Schedule");
const router = express.Router();

router.post("/create", create);
router.get("/list", list);
router.put("/update/:id", update);
module.exports = router;
