const asyncHandler = require("express-async-handler");
const pool = require("../config/database");

// @desc    Add new form
// @route   POST /api/posts
// @access  Private
const addPost = asyncHandler(async (req, res) => {
  try {
    const { title, desc, post_type } = req.body;
    const photos = req.files || [];

    if (!title || !desc || !post_type)
      return res.status(400).json({
        error: "Please enter all fields (title, desc, post_type)",
      });

    if (photos.length === 0)
      return res.status(400).json({
        error: "Please enter at least one image for the post",
      });

    const q =
      "INSERT INTO `db_lalucha`.`posts` (`title`, `desc`, `post_type`) VALUES (?, ?, ?);";
    const resultHeaders = await pool.query(q, [title, desc, post_type]);

    // If insert failed
    if (resultHeaders.affectedRows <= 0)
      throw new Error("Unable to insert data in posts table");

    const q2 =
      "INSERT INTO `db_lalucha`.`posts_photos` (`photo`, `idposts`) VALUES (?, ?);";

    if (photos.length > 0)
      for (let i = 0; i < photos.length; i++)
        await pool.query(q2, [photos[i].originalname, resultHeaders.insertId]);

    const post = await pool.query("SELECT * FROM posts WHERE idposts = ?", [
      resultHeaders.insertId,
    ]);
    const postPhotos = await pool.query(
      "SELECT * FROM posts_photos WHERE idposts = ?",
      [resultHeaders.insertId]
    );

    post[0].photos = postPhotos;

    return res.status(201).json({
      message: "Post created",
      createdPost: post[0],
    });
  } catch (error) {
    console.log(error);
    if (error) return res.status(400).json({ error: error });
  }
});

// @desc    Get posts
// @route   GET /api/posts
// @access  Public
const getPosts = asyncHandler(async (req, res) => {
  try {
    const q = "SELECT * FROM posts";
    const posts = await pool.query(q);

    if (!posts)
      return res
        .status(400)
        .json({ error: "An error occurred trying to get posts" });

    const photos = await pool.query("SELECT * FROM posts_photos");

    posts.forEach((post) => {
      // Add property 'photos' to the posts
      post.photos = [];
      photos.forEach((photo) => {
        if (post.idposts === photo.idposts) post.photos.push(photo);
      });
    });

    // for (let i = 0; i < posts.length; i++) {
    //   // Add 'photos' array prop to posts object
    //   posts[i].photos = [];
    //   for (let j = 0; j < photos.length; j++) {
    //     if (posts[i].idposts === photos[j].idposts) {
    //       posts[i].photos.push(photos[j]);
    //     }
    //   }
    // }

    return res.status(200).json({ posts });
  } catch (error) {
    console.log(error);
    if (error) return res.status(400).json({ error });
  }
});

const getPostPhotos = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const q = "SELECT * FROM posts_photos WHERE idposts = ?";
    const photos = await pool.query(q, [id]);

    console.log("Photos", photos);

    req.files = photos;

    req.files.forEach((photo) => {
      res.sendFile(photo.photo);
    });

    res.status(200).json(photos);
  } catch (error) {
    console.log(error);
    if (error) return res.status(400).json({ error });
  }
});

// @desc    Get post by Id
// @route   GET /api/posts/:id
// @access  Public
const getPost = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const q1 = "SELECT * FROM posts WHERE idposts = ?";
    const q2 = "SELECT * FROM posts_photos WHERE idposts = ?";
    const postOutput = await pool.query(q1, [id]);
    const photos = await pool.query(q2, [id]);

    const post = postOutput[0];

    // Add photos array to post
    post.photos = photos;

    if (!post) return res.status(400);

    res.sendFile(__dirname + "/public/images/arenal.jpg");

    return res.status(200).json(post);
  } catch (error) {
    console.log(error);
    if (error) return res.status(400).json({ error });
  }
});

module.exports = {
  addPost,
  getPosts,
  getPost,
  getPostPhotos,
};
