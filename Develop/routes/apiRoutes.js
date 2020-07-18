// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// ===============================================================================
const create = require("../db/create");
var notesData = require("../db/db.json");
var fs = require("fs");
// const { create  = require("");
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
        res.json(notesData);
    });

    // API POST Requests
    // ---------------------------------------------------------------------------

    // when a use creates a new notes 
    app.post("/api/notes", function (req, res) {
        console.log("Post was called");
        console.log(record);
        console.log(req.body);
        console.log(req.body.title);

        // re.body.title & text
         create.addNotes(req.body.title, req.body.text).then((notes) => res.json(notes))
         .catch((err) => console.log(err));


        // .read()
        // .write();

        // capture the new info
        var record = {
            // creates new id 
            // id: db.length + Math.floor(Math.random() * 100),
            title: req.body.title,
            text: req.body.text
        }

        // pushes the new record into the db array
        // db.push(record);

        // updates the db file
        // fs.writeFileSync(notesData, JSON.stringify(db), function (err) {
        //     if (err) {
        //         throw err;
        //     }

        //     // console.log(db);
        //     // takes the new note in the db array and adds it to the db.json file
        //     res.json(db);
        // });
    })

    // DELETE note operation
    // app.delete("/api/notes/:id", function (req, res) {
    //     // create a new empty array
    //     var newArr = [];
    //     // loop through all items currently in the db array
    //     for (let i = 0; i < db.length; i++) {
    //         // for every item that is NOT the note that the user has chosen
    //         if (db[i].id != req.params.id) {
    //             // push every other item into this new array
    //             newArr.push(db[i]);
    //         }
    //     }
    // })



}

// if (tableData.length < 5) {
//   tableData.push(req.body);
//   res.json(true);
// }
// else {
//   waitListData.push(req.body);
//   res.json(false);
// }