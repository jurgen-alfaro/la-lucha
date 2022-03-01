const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv").config();
const connectDB = require("./config/database");
const port = process.env.PORT || 5000;
const { errorHandler } = require("./middleware/errorHandler");

const app = express();

connectDB;

// Middlewares
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(errorHandler);

// Routes
app.use("/api/asada", require("./routes/asadaRoutes"));
app.use("/api/login", require("./routes/authRoutes"));
app.use("/api/projects", require("./routes/projectRoutes"));
app.use("/api/user-files", require("./routes/userFilesRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

app.use = app.listen(port, () => console.log(`Server started on port ${port}`));
