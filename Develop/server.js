// Dependencies
// =============================================================
var express = require("express");
// var path = require("path");
// var fs = require("fs");
// var db = [];

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8090;


// Sets up the Express app to handle data parsing
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ================================================================================
// ROUTER
// The below points our server to a series of "route" files.
// These routes give our server a "map" of how to respond when users visit or request data from various URLs.
// ================================================================================

require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// var apiRoutes = require("./routes/apiRoutes")
// console.log(apiRoutes); //=> [Function]
// apiRoutes(app);


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});