const express = require("express");
const router = express.Router();
const {
  addPost,
  getPosts,
  getPost,
  getPostPhotos,
} = require("../controllers/postController");
const uploadForPosts = require("../middleware/multerForPosts");

router.route("/").post(uploadForPosts, addPost).get(getPosts);
router.route("/:id").get(getPost);
router.route("/:id/photos").get(getPostPhotos);

module.exports = router;
