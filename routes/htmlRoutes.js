const express = require("express");
const path = require("path");

const app = express();

app.get("/notes", (req, res) => 
    res.sendFile(path.join(__dirname, "../public/notes.html"))
);

// Set fallback route for when a user attempts to visit routes that don't exist
app.get("*", (req, res) => 
    res.sendFile(path.join(__dirname, "../public/index.html"))
);








//GET /notes should return the notes.html file.
//GET * should return the index.html file.
//Fallback route for when a user attempts to visit routes that don't exist


