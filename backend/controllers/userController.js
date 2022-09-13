const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const pool = require("../config/database");

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await pool.query("SELECT * FROM users WHERE email = ?", [email]);

  if (user.length && (await bcrypt.compare(password, user[0].password))) {
    res.status(200).json({
      _id: user[0].iduser,
      name: user[0].name,
      email: user[0].email,
      token: generateToken(user[0].iduser),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  const user = await pool.query("SELECT * FROM users WHERE iduser = ?", [
    req.user[0].iduser,
  ]);
  const { iduser, name, email } = user[0];

  res.status(200).json({
    id: iduser,
    name,
    email,
  });
});

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, password, email } = req.body;

  if (!name || !password || !email) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  const userExists = await pool.query(
    "SELECT email FROM users WHERE email = ?",
    [email]
  );

  if (userExists.length) {
    res.status(400);
    throw new Error("User alerady exists");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = { name, email, password: hashedPassword };

  await pool.query("INSERT INTO users SET ?", [user]);

  const newUser = await pool.query(
    "SELECT iduser, name, email FROM users WHERE email = ?",
    [user.email]
  );

  if (newUser) {
    res.status(201).json({
      _id: newUser[0].iduser,
      name: newUser[0].name,
      email: newUser[0].email,
      token: generateToken(newUser[0].iduser),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Get all users
// @route   GET /api/users
// @access  Private
const getUsers = asyncHandler(async (req, res) => {
  try {
    const q = "SELECT iduser, name, email, created_at, updated_at FROM users";
    const users = await pool.query(q);

    if (!users)
      return res.status(400).json({
        error: "An error occurred trying to get users from users",
      });

    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    if (error) return res.status(400).json({ error });
  }
});

// @desc   Get user by Id
// @route   GET /api/users/:id
// @access  Private
const getUser = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const user = await pool.query(
      "SELECT name, email, created_at, updated_at FROM users WHERE iduser = ?",
      [id]
    );

    if (!user) {
      res.status(400);
      throw new Error("GET user by id failed");
    }

    res.status(200).json({
      user,
    });
  } catch (error) {
    throw new Error(
      "An error occured on the GET request for suggestions table",
      error
    );
  }
});

// @desc    Update user by Id (not password change)
// @route   PUT /api/junta/:id
// @access  Private
const updateUser = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    if (!name || !email)
      return res.status(400).json({
        error: "Please enter all the fields (name, email)",
      });

    const q = `UPDATE users SET name = '${name}', email = '${email}' WHERE iduser = ?`;
    const resultHeader = await pool.query(q, [id]);

    if (resultHeader.affectedRows <= 0)
      return res
        .status(400)
        .json({ error: 'No fields were updated in "users" table' });

    const user = await pool.query(
      "SELECT name, email FROM users WHERE iduser = ?",
      [id]
    );

    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
});

// Confirm if the password is the same as the one in the DB.
const confirmPassword = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { password } = req.body;

    const user = await pool.query(
      "SELECT password FROM users WHERE iduser = ?",
      [id]
    );

    if (user.length && (await bcrypt.compare(password, user[0].password)))
      return res.status(200).json({
        result: true,
      });
    else
      return res.status(200).json({
        result: false,
      });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
});

// Change password
const changePassword = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { password } = req.body;

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const q = `UPDATE users SET password = '${hashedPassword}' WHERE iduser = ?`;
    const resultHeader = await pool.query(q, [id]);

    if (resultHeader.affectedRows <= 0)
      return res
        .status(400)
        .json({ error: 'Password was not modified in "users" table' });

    res.status(200).json({ result: "Password changed successfully" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
});

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

module.exports = {
  registerUser,
  getMe,
  loginUser,
  getUsers,
  getUser,
  updateUser,
  changePassword,
  confirmPassword,
};
