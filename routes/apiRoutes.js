
// LOAD DATA
// ===============================================================================

// Accepts Create class 
const create = require("../db/create");
// Accepts the db info
const notesData = require("../db/db.json");

// ROUTING
// ===============================================================================
module.exports = function (app) {

    // API GET Requests
    // ---------------------------------------------------------------------------

    // When the user inputs /api/notes, they will be returned the db.json information.
    app.get("/api/notes", function (req, res) {
        
        create
            .getNotes()
            .then(function (notes) {
                return res.json(notes)
            })
    });


    // API POST Requests
    // ---------------------------------------------------------------------------

    // when a use creates a new notes 
    app.post("/api/notes", function (req, res) {

        // Added notes to db.json
        create
            .addNotes(req.body.title, req.body.text)
            .then((notes) => res.json(notes))
            .catch((err) => console.log(err));
       
    });

    // ---------------------------------------------------------------------------
    // Displays a single note
    app.get("/api/notes/:id", function (req, res) {

        // Grab the selected parameter
        var chosen = req.params.id;
      
        // Filter to show only the selected character
        for (var i = 0; i < notesData.length; i++) {
            console.log("notesData: " + JSON.stringify(notesData[i].id));
            console.log("chosen in for: " + chosen);
            console.log(chosen === JSON.stringify(notesData[i].id));
            if (chosen === JSON.stringify(notesData[i].id)) {
                console.log("if has been chosen");
                return res.json(notesData[i]);
            }
        }
    });

    // DELETE note operation
    app.delete("/api/notes/:id", function (req, res) {
        console.log("delete was called");
        console.log("req bod id " + req.params.id);

        create
        .removeNote(req.params.id)
        .then((notes) => res.json(notes))
         
    })
}


