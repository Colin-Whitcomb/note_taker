// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var fs = require("fs");
// const { Router } = require("express");
// const { debugPort } = require("process");
var db = [];

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Stores new notes
  // =============================================================
  router.post("/api/notes", function(req, res) {
    var record = {
      // creates new id 
      id: db.length + Math.floor(Math.random()*100),
      title: req.body.title,
      text: req.body.text
    }
    // pushes the new record into the db array
    db.push(record)

    // updates the db file
    fs.writeFileSync("./db.db.json", JSON.stringify(db), function(err){
      if(err) {
        throw err;
      }
      console.log(db);
      res.json(db);
    });
  })

// 
router.delete("/api/notes/:id", function(req, res){
  var newArr = [];
  for (let i=0; i < db.length; i++) {
    if(db[i].id !=req.params.id){
      newArr.push(db[i]);
    }
  }
})
// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});