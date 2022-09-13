const asyncHandler = require("express-async-handler");
const pool = require("../config/database");

// @desc    Register new suggestion
// @route   POST /api/suggestions
// @access  Public
const registerSuggestion = asyncHandler(async (req, res) => {
  const { name, last_name, email, subject, message } = req.body;

  if (!name || !last_name || !email || !subject || !message) {
    res.status(400);
    throw new Error(
      "Please add all fields (name, last_name, email, subject, message)"
    );
  }

  // Create suggestion
  const suggestion = { name, last_name, email, subject, message };

  await pool.query("INSERT INTO suggestions SET ?", [suggestion]);

  const idSuggestion = await pool.query(
    "SELECT LAST_INSERT_ID()" // <- This retrieves the ID generated for an AUTO_INCREMENT column by the previous query (usually INSERT)
  );

  const newSuggestion = await pool.query(
    "SELECT * FROM suggestions WHERE idsuggestions = ?",
    [idSuggestion[0]["LAST_INSERT_ID()"]]
  );

  if (newSuggestion) {
    res.status(201).json({
      /* _id: newSuggestion[0].idsuggestions, */
      name: newSuggestion[0].name,
      last_name: newSuggestion[0].last_name,
      email: newSuggestion[0].email,
      subject: newSuggestion[0].subject,
      message: newSuggestion[0].message,
      is_pending: newSuggestion[0].is_pending,
      created_at: newSuggestion[0].created_at,
      updated_at: newSuggestion[0].updated_at,
    });
  } else {
    res.status(400);
    throw new Error("Invalid suggestion data");
  }
});

// @desc Get suggestions
// @route GET /api/suggestions
// @access Private
const getSuggestions = asyncHandler(async (req, res) => {
  try {
    const suggestions = await pool.query("SELECT * FROM suggestions");

    res.status(200).json({
      suggestions: suggestions,
    });
  } catch (error) {
    throw new Error(
      "An error occured on the GET request for suggestions table",
      error
    );
  }
});

// @desc Get suggestion by ID
// @route GET /api/suggestions/:id
// @access Private
const getSuggestion = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const suggestion = await pool.query(
      "SELECT * FROM suggestions WHERE idsuggestions = ?",
      [id]
    );

    if (!suggestion) {
      res.status(400);
      throw new Error("GET suggestion by id failed");
    }

    res.status(200).json({
      suggestion: suggestion,
    });
  } catch (error) {
    throw new Error(
      "An error occured on the GET request for suggestions table",
      error
    );
  }
});

// @desc Update a suggestion
// @route PUT /api/suggestions/:id
// @access Private
const updateSuggestion = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { is_pending } = req.body;

    if (!is_pending) {
      res.status(400);
      throw new Error("Please enter all the fields(is_pending)");
    }

    const updSuggestion = {
      is_pending,
    };

    await pool.query("UPDATE suggestions SET ? WHERE idsuggestions = ?", [
      updSuggestion,
      id,
    ]);

    const updatedSuggestion = await pool.query(
      "SELECT * FROM suggestions WHERE idsuggestions = ?",
      [id]
    );

    if (!updatedSuggestion) {
      res.status(400);
      throw new Error("UPDATE failed on suggestions table");
    }

    res.status(200).json({
      message: "Sugerencia actualizada exitosamente",
      updatedSuggestion: updatedSuggestion,
    });
  } catch (error) {
    console.log(error);
    res.status(400);
    throw new Error("Update request failed", error);
  }
});

module.exports = {
  registerSuggestion,
  getSuggestions,
  getSuggestion,
  updateSuggestion,
};
