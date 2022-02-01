const fs = require("fs");
const express = require("express");
const apiRoutes = express.Router();
const app = express();
// 
const { v4: uuidv4 } = require("uuid");

// Obtain existing notes
app.get("/api/notes", (req, res) => {
    fs.readFile("./db/db.json", "utf8", (err, data) => {
        if (err) {
            console.error(err);
        } else {
            //Convert string into JSON object
            res.json(JSON.parse(data));
        }
    })
})

//create new notes
app.post("/api/notes", (req, res) => {
    // Assign newNote in req.body and give newNote an unique id
    const newNote = req.body;
    newNote.id = uuidv4();
    fs.readFile("./db/db.json", "utf8", (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const notes = JSON.parse(data);
            notes.push(newNote);
            fs.writeFile("./db/db.json", JSON.stringify(notes), (err) => {
                if (err) {
                    console.error(err)
                } else {
                    res.json(notes);
                }
            })
        }
    })
})

//delete note
app.delete("/api/notes/:id", (req, res) => {
    const id = req.params.id;
    fs.readFile("./db/db.json", "utf8", (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const notes = JSON.parse(data);
            // Create a new array of notes except the one with the id
            const notesArr = notes.filter((note) => note.id !== id);

            // Save the array to the filesystem
            fs.writeFile("./db/db.json", JSON.stringify(notesArr), (err) => {
                if (err) {
                    console.error(err) 
                } else {
                    res.json(notesArr);
                }
            })
        }
    })
})

module.exports = apiRoutes;
//POST /api/notes should receive a new note to save on the request 
//body, add it to the db.json file, and then return the new note to 
//the client. You'll need to find a way to give each note a unique id 
//when it's saved (look into npm packages that could do this for you).




//delete existing notes
//DELETE /api/notes/:id should receive a query parameter that contains the id 
//of a note to delete. To delete a note, you'll need to read all notes from 
//the db.json file, remove the note with the given id property, and then rewrite 
//the notes to the db.json file.
