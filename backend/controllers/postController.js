const asyncHandler = require("express-async-handler");
const pool = require("../config/database");
const path = require("path");
const fs = require("fs");

// @desc    Add new form
// @route   POST /api/posts
// @access  Private
const addPost = asyncHandler(async (req, res) => {
  try {
    const { title, desc, post_type } = req.body;
    const photos = req.files || [];

    if (!title || !desc || !post_type)
      return res.status(400).json({
        error: "Please enter all fields (title, pdesc, post_type)",
      });

    if (photos.length === 0)
      return res.status(400).json({
        error: "Please enter at least one image for the post",
      });

    const q =
      "INSERT INTO `db_lalucha`.`posts` (`title`, `pdesc`, `post_type`) VALUES (?, ?, ?);";
    const resultHeaders = await pool.query(q, [title, desc, post_type]);

    // If insert failed
    if (resultHeaders.affectedRows <= 0)
      throw new Error("Unable to insert data in posts table");

    const q2 =
      "INSERT INTO `db_lalucha`.`uploaded_photos` (`photo`, `idposts`) VALUES (?, ?);";

    if (photos.length > 0)
      for (let i = 0; i < photos.length; i++)
        await pool.query(q2, [photos[i].filename, resultHeaders.insertId]);

    const post = await pool.query("SELECT * FROM posts WHERE idposts = ?", [
      resultHeaders.insertId,
    ]);
    const postPhotos = await pool.query(
      "SELECT * FROM uploaded_photos WHERE idposts = ?",
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
    const q = "SELECT * FROM posts ORDER BY created_at DESC";
    const posts = await pool.query(q);

    if (!posts)
      return res
        .status(400)
        .json({ error: "An error occurred trying to get posts" });

    const photos = await pool.query("SELECT * FROM uploaded_photos");

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
    const q = "SELECT * FROM uploaded_photos WHERE idposts = ?";
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
    const q2 = "SELECT * FROM uploaded_photos WHERE idposts = ?";
    const postOutput = await pool.query(q1, [id]);
    const photos = await pool.query(q2, [id]);

    const post = postOutput[0];

    // Add photos array to post
    post.photos = photos;

    if (!post) return res.status(400);

    return res.status(200).json(post);
  } catch (error) {
    console.log(error);
    if (error) return res.status(400).json({ error });
  }
});

// @desc    Update post by Id
// @route   PUT /api/posts/:id
// @access  Private
const updatePost = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { title, pdesc, post_type } = req.body;

    let photos = []; // <--- empty in case there's no update to the photos

    if (req.files !== undefined)
      req.files.forEach((photo) => photos.push(photo));

    if (!title || !pdesc || !post_type)
      return res.status(400).json({
        error: "Please enter all the fields (title, pdesc, post_type)",
      });

    // // Get previous photo document
    // const prevPhoto = await pool.query(
    //   "SELECT photo FROM junta_directiva WHERE idmember = ?",
    //   [id]
    // );

    // If photos is not defined, then the same photo should be retained
    if (
      photos === undefined ||
      photos === null ||
      photos === "" ||
      photos.length === 0
    ) {
      const q = `UPDATE posts SET title = '${title}', pdesc = '${pdesc}', post_type = '${post_type}' WHERE idposts = ?`;
      const resultHeaders = await pool.query(q, [id]);

      if (resultHeaders.affectedRows <= 0)
        return res
          .status(400)
          .json({ error: 'No fields were updated in "posts" table' });
    } else {
      // Update the posts
      // The previous photos will be retained, the new photos will be added to the existing post.
      // The text coming from pdesc should not contain any single quote (')
      const q = `UPDATE posts SET title =  '${title}', pdesc = '${pdesc}', post_type = '${post_type}'  WHERE idposts = ?`,
        resultHeaders = await pool.query(q, [id]);

      if (resultHeaders.affectedRows <= 0)
        return res
          .status(400)
          .json({ error: 'No fields were updated in "posts" table' });

      // Add the new photos
      const q1 =
        "INSERT INTO `db_lalucha`.`uploaded_photos` (`photo`, `idposts`) VALUES (?, ?)";
      photos.forEach(async (photo) => {
        const resultHeader = await pool.query(q1, [photo.filename, id]);
      });
    }

    const post = await pool.query("SELECT * FROM posts WHERE idposts = ?", [
      id,
    ]);

    res.status(200).json({ message: "Post updated successfully", post });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
});

// @desc    Delete post photo
// @route   DELETE /api/posts/:id
// @access  Private
const deletePostPhoto = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const q = "DELETE FROM uploaded_photos WHERE idphoto = ?";
    const photo = await pool.query(
      "SELECT photo FROM uploaded_photos WHERE idphoto = ? ",
      [id]
    );
    const resultHeader = await pool.query(q, [id]);

    if (resultHeader.affectedRows > 0) {
      const oldPath = path.join(__dirname, "..", "uploads", photo[0].photo);

      if (fs.existsSync(oldPath)) {
        fs.unlink(oldPath, (err) => {
          if (err) {
            console.error(err);
            return;
          }
          console.log(`Photo deleted from server: ${photo[0].photo}`);
        });
      }
      return res.status(200).json({ resultHeader: resultHeader });
    } else
      return res
        .status(200)
        .json({ error: "No se ha podido eliminar la foto de la publicación" });
  } catch (error) {
    console.log(error);
    if (error) return res.status(400).json({ error: error });
  }
});

module.exports = {
  addPost,
  getPosts,
  getPost,
  getPostPhotos,
  updatePost,
  deletePostPhoto,
};
