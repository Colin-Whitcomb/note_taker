// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// ===============================================================================

var notesData = require("../db/db.json");

var db = [];
// var waitListData = require("../data/waitinglistData");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
    // API GET Requests
    // ---------------------------------------------------------------------------

    // When the user inputs /api/notes, they will be returned the db.json information.
    app.get("/api/notes", function (req, res) {
        res.json(path.join(notesData));
    });

    // API POST Requests
    // ---------------------------------------------------------------------------

    // when a use creates a new notes 
    app.post("/api/notes", function (req, res) {

        // capture the new info
        var record = {
            // creates new id 
            id: db.length + Math.floor(Math.random() * 100),
            title: req.body.title,
            text: req.body.text
        }

        // pushes the new record into the db array
        db.push(record);

        // updates the db file
        fs.writeFileSync("../db/db.json", JSON.stringify(db), function (err) {
            if (err) {
                throw err;
            }
            
            // console.log(db);
            // takes the new note in the db array and adds it to the db.json file
            res.json(db);
        });
    })



}

// if (tableData.length < 5) {
//   tableData.push(req.body);
//   res.json(true);
// }
// else {
//   waitListData.push(req.body);
//   res.json(false);
// }