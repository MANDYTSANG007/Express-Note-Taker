// Dependencies
const fs = require("fs")
const express = require("express");
const path = require("path");
const apiRoutes = require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlRoutes");
const { v4: uuidv4 } = require("uuid");


// Set up the Express App
const PORT =  process.env.PORT || 3001;
const app = express();

// Need for serving index.js
app.use(express.static("public"));

// Middleware for parsing JSON and urlencoded form data
//app.use(express.urlencoded({ extended: true }));

// Need for req.body
app.use(express.json());

//app.use("/", htmlRoutes);
//app.use("/api", apiRoutes);

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

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

// Set fallback route for when a user attempts to visit routes that don't exist
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

// Listener
app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
});
