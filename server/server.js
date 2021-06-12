const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");

// Importing custom routes
const usersRoute = require("./routes/usersRoute");
const moviesRoute = require("./routes/moviesRoute");
const actorsRoute = require("./routes/actorsRoute");
const genresRoute = require("./routes/genresRoute");

// Middlewares
app.use(express.json());
app.use(cors());
app.use('/uploads',express.static("uploads"));

// Route Middlelware
app.use("/api/users", usersRoute);
app.use("/api/movies", moviesRoute);
app.use("/api/actors", actorsRoute);
app.use("/api/genres", genresRoute);

// Extracting Json
app.use(express.json());

// Requiring databasae
require("./database/db");

const PORT = process.env.PORT || 5000;

module.exports = app.listen(PORT, () => console.log(`Server is running at port ${PORT}`));