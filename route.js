// / Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
  });
  
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "notes.html"));
  });

  app.get("/api//notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./db/db.json"));
  });

