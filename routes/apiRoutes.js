const fs = require("fs");


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






//delete existing notes
