const asyncHandler = require("express-async-handler");
const pool = require("../config/database");
const path = require("path");
const fs = require("fs");
const filesPath = path.join(__dirname, "../uploads/cv"); // ----> ../uploads/cv

// @desc    Add new form
// @route   POST /api/jobs
// @access  Public
const addJob = asyncHandler(async (req, res) => {
  try {
    const { name, last_name, email, phone_number } = req.body;
    const curriculum = req.file.filename;

    if (!name || !last_name || !email || !phone_number)
      return res.status(400).json({
        error: "Please enter all fields (name, last_name, email, phone_number",
      });

    const q =
        "INSERT INTO `" +
        process.env.MYSQL_DATABASE +
        "`.`jobs` (`name`, `last_name`, `email`, `phone_number`, `curriculum`) VALUES (?, ?, ?, ?, ?);",
      resultHeader = await pool.query(q, [
        name,
        last_name,
        email,
        phone_number,
        curriculum,
      ]);

    // If insert failed
    if (resultHeader.affectedRows <= 0)
      throw new Error("Unable to insert data in jobs table");

    const newJob = await pool.query("SELECT * FROM jobs WHERE idjobs = ?", [
      resultHeader.insertId,
    ]);

    return res
      .status(201)
      .json({ message: "Job added to database", job: newJob[0] });
  } catch (error) {
    console.log(error);
    if (error) return res.status(400).json({ error });
  }
});

// @desc    Get jobs
// @route   GET /api/jobs
// @access  Private
const getJobs = asyncHandler(async (req, res) => {
  try {
    const q = "SELECT * FROM jobs",
      jobs = await pool.query(q);

    if (!jobs)
      return res
        .status(400)
        .json({ error: "An error occurred trying to get jobs" });

    return res.status(200).json({ jobs });
  } catch (error) {
    console.log(error);
    if (error) return res.status(400).json({ error });
  }
});

// @desc    Get job by id
// @route   GET /api/jobs/:id
// @access  Private
const getJob = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params,
      q = "SELECT * FROM jobs WHERE idjobs = ?",
      job = await pool.query(q, [id]);

    if (!job)
      return res
        .status(400)
        .json({ error: "An error occured trying to get job by Id" });

    return res.status(200).json(job[0]);
  } catch (error) {
    console.log(error);
    if (error) return res.status(400).json({ error });
  }
});

// @desc    Download curriculum
// @route   GET /api/jobs/:id/download
// @access  Private
const downloadCurriculum = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params,
      q = `SELECT curriculum FROM jobs WHERE idjobs = ?`,
      doc = await pool.query(q, [id]);

    if (!doc)
      return res
        .status(400)
        .json({ error: "An error occured trying to download the curriculum" });

    const fileName = doc[0].curriculum.split("-")[0],
      fileExt = doc[0].curriculum.split(".")[1];

    return res.download(
      `${filesPath}/${doc[0].curriculum}`,
      `${fileName}.${fileExt}`
    );
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
});

// @desc    Download curriculum
// @route   GET /api/jobs/:id/cv
// @access  Private
const displayCurriculum = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params,
      q = `SELECT curriculum FROM jobs WHERE idjobs = ?`,
      doc = await pool.query(q, [id]);

    const fileName = doc[0].curriculum;

    res.setHeader("Content-Type", "application/pdf");
    res.sendFile(fileName, { root: filesPath }, (err) => {
      if (err) console.log(err);
      else console.log("Sent: ", fileName);
    });
  } catch (error) {
    console.log(error);
  }
});

// @desc    Update job
// @route   PUT /api/jobs/:id
// @access  Private
const updateJob = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { is_pending } = req.body;

    if (!is_pending) {
      res.status(400);
      throw new Error("Please enter all the fields(is_pending)");
    }

    const q = "UPDATE jobs SET `is_pending` = ? WHERE idjobs = ?";
    const resultHeaders = await pool.query(q, [is_pending, id]);

    console.log(resultHeaders);

    if (resultHeaders.affectedRows <= 0)
      return res
        .status(400)
        .json({ error: 'No fields were updated in "jobs" table' });

    const updatedJob = await pool.query("SELECT * FROM jobs WHERE idjobs = ?", [
      id,
    ]);

    return res
      .status(200)
      .json({ message: "Job updated successfully", updatedJob });
  } catch (error) {
    console.log(error);
    res.status(400);
    throw new Error("Update request failed", error);
  }
});

module.exports = {
  addJob,
  getJobs,
  getJob,
  updateJob,
  downloadCurriculum,
  displayCurriculum,
};
