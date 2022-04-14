const express = require("express");
const router = express.Router();
const {
  addPost,
  getPosts,
  getPost,
  getPostPhotos,
  updatePost,
  deletePostPhoto,
} = require("../controllers/postController");
const uploadForPosts = require("../middleware/multerForPosts");
const { protect } = require("../middleware/authMiddleware");

router.route("/").post(protect, uploadForPosts, addPost).get(getPosts);
router.route("/:id").get(getPost).put(protect, uploadForPosts, updatePost);
router.route("/photo/:id").delete(deletePostPhoto);

module.exports = router;
