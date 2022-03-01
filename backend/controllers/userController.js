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
    res.json({
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

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

module.exports = { registerUser, getMe, loginUser };
