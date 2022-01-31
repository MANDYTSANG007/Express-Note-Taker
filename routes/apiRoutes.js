const fs = require("fs");
// 
const uuid = require("uuid");

// Obtain existing notes
app.get("/notes", (req, res) => {
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
app.post("/notes", (req, res) => {
    // Assign newNote in req.body and give newNote an unique id
    const newNote = req.body;
    newNote.id = uuid;
    fs.writeFile("./db/db.json", JSON.stringify(notes), (err) => {
        if (err) {
            console.error(err)
        } else {
            res.json(notes);
        }
    })
})

//POST /api/notes should receive a new note to save on the request 
//body, add it to the db.json file, and then return the new note to 
//the client. You'll need to find a way to give each note a unique id 
//when it's saved (look into npm packages that could do this for you).




//delete existing notes
//DELETE /api/notes/:id should receive a query parameter that contains the id 
//of a note to delete. To delete a note, you'll need to read all notes from 
//the db.json file, remove the note with the given id property, and then rewrite 
//the notes to the db.json file.
