// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// ===============================================================================
const create = require("../db/create");
const notesData = require("../db/db.json");
const fs = require("fs");
// const { create  = require("");
const db = [];
// var waitListData = require("../data/waitinglistData");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
    // API GET Requests
    // ---------------------------------------------------------------------------

    // When the user inputs /api/notes, they will be returned the db.json information.
    app.get("/api/notes", function (req, res) {
        console.log("I am app.get");
       create
       .getNotes()
       .then(function (notes){
           console.log(notes);
           return res.json(notes)
       })
        // res.json(notesData);
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

    // // capture the new info
    // var record = {
    //     // creates new id 
    //     id: notesData.length + Math.floor(Math.random() * 100),
    //     title: req.body.title,
    //     text: req.body.text
    // }

    // app.post("/api/notes", function (req, res) {
    //     var reqBody = req.body;
    //     var notes = fs.readFileSync("./db/db.json");
    //     reqBody.id = String(notes.length);
    //     notes = JSON.parse(notes);
    //     notes.push(reqBody);
    //     fs.writeFileSync("./db/db.json", JSON.stringify(notes));
    //     res.json(notes);
    // })

    // var populatepage = () => {
    //     console.log("pop page was called");
    //     app.get("/api/notes", function (req, res) {
    //         res.json(notesData);
    //         console.log("ntes data" + notesData);
    //     });
    // }
    // DELETE note operation
    app.delete("/api/notes/:id", function (req, res) {
        // create a new empty array
        var newArr = [];
        // loop through all items currently in the db array
        for (let i = 0; i < db.length; i++) {
            // for every item that is NOT the note that the user has chosen
            if (db[i].id != req.params.id) {
                // push every other item into this new array
                newArr.push(db[i]);
            }
        }
    });
}

// })





// if (tableData.length < 5) {
//   tableData.push(req.body);
//   res.json(true);
// }
// else {
//   waitListData.push(req.body);
//   res.json(false);
// }

// updates the db file
// fs.writeFileSync(notesData, JSON.stringify(db), function (err) {
//     if (err) {
//         throw err;
//     }

//     // console.log(db);
//     // takes the new note in the db array and adds it to the db.json file
//     res.json(db);
// });