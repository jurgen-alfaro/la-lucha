const express = require("express");
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");
const dotenv = require("dotenv").config();
const connectDB = require("./config/database");
const port = process.env.PORT;
const { errorHandler } = require("./middleware/errorHandler");

const app = express();

// Middlewares
app.use(morgan("dev"));
app.use(express.static(path.join("backend", "uploads")));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errorHandler);

// Routes
app.use("/api/asada", require("./routes/asadaRoutes"));
app.use("/api/login", require("./routes/authRoutes"));
app.use("/api/projects", require("./routes/projectRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/suggestions", require("./routes/suggestionRoutes"));
app.use("/api/forms", require("./routes/formRoutes"));
app.use("/api/jobs", require("./routes/jobRoutes"));
app.use("/api/posts", require("./routes/postRoute"));
app.use("/api/junta", require("./routes/juntaDirectivaRoutes"));

app.use = app.listen(port, () => console.log(`Server started on port ${port}`));
