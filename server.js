// Dependencies
const express = require("express");
const path = require("path");
const api = require("./routes/apiRoutes");

const PORT =  process.env.PORT || 3001;
const app = express();


// Middleware for parsing JSON and urlencoded form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api", api);

app.use(express.static("public"));

// GET Route for homepage
app.get("/", (req, res) => 
    res.sendFile(path.join(__dirname, "/public/index.html"))
);

// GET Route for notes page
app.get("/", (req, res) =>
    res.sendFile(path.join(__dirname, "/public/notes.html"))
);


