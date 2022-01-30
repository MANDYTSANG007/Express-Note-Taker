// Dependencies
const express = require("express");
const path = require("path");
const api = require("./routes/apiRoutes");

// Set up the Express App
const PORT =  process.env.PORT || 3001;
const app = express();


// Middleware for parsing JSON and urlencoded form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api", api);

app.use(express.static("public"));

// Listener
app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);
