const path = require("path");
const express = require("express");
const htmlRoutes = require("express").Router();

const app = express();

htmlRoutes.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// Set fallback route for when a user attempts to visit routes that don't exist
htmlRoutes.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

module.exports = htmlRoutes;






//GET /notes should return the notes.html file.
//GET * should return the index.html file.
//Fallback route for when a user attempts to visit routes that don't exist


