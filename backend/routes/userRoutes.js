const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
  getUsers,
  getUser,
  updateUser,
  confirmPassword,
  changePassword,
} = require("../controllers/userController");

const { protect } = require("../middleware/authMiddleware");

router.route("/").post(registerUser).get(getUsers);
router.route("/:id").get(getUser).put(updateUser);
router.route("/:id/confirmPassword").post(confirmPassword);
router.route("/:id/changePassword").post(changePassword);
router.post("/login", loginUser);
router.get("/me", protect, getMe);

module.exports = router;
