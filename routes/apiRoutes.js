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
        // console.log("I am app.get");
        create
            .getNotes()
            .then(function (notes) {
                // console.log(notes);
                return res.json(notes)
            })

        // console.log("Notes data: " + notesData[0].id);
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
        console.log("added notes, req.body.title: " + req.body.title);
    });


    // ---------------------------------------------------------------------------
    // Displays a single note
    app.get("/api/notes/:id", function (req, res) {

        // var notesDataString = JSON.stringify(notesData);
        // console.log("Notes Data:" + notesDataString);

        // console.log("Hello Query", query)
        // Grab the selected parameter
        var chosen = req.params.id;
        console.log("chosen.id: " + chosen);
        // console.log(chosen === "3");

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


