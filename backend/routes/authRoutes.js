const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ message: "This is the user from the backend" });
});

module.exports = router;
