// Node requires
var fs = require('fs');
var util = require('util');

// make sure that read/writeFile are promisified
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

// class constructor
class Create {

    // promisified readFile function
    read() {
        return readFileAsync("db/db.json", "UTF-8");
    }
    // promisified writeFile function
    write(note) {
        return writeFileAsync("db/db.json", JSON.stringify(note));
    }

    // Get notes that are in db and parse them 
    getNotes() {
    
        return this.read().then((notes) => { 
            var parseNotes;
            try {
                parseNotes = [].concat(JSON.parse(notes));
            } catch (err) {
                parseNotes = [];
            }
           
            return parseNotes;
          
        });
    }

    // Add new note and attribute with new ID
    addNotes(title, text) {
        const newNote = { 
            id: Math.random(),
            title: title,
            text: text, };
        if (!title || !text){
            throw error;
        } 
     
        return this.getNotes()
        .then((notes) => [...notes, newNote])
        .then((updateNotes) => this.write(updateNotes))
        .then(() => (newNote))
        
    
    }

    // Remove note with associated ID
    removeNote(id) {
        
        var parsedId = JSON.parse(id);

        return this.getNotes()
        .then((notes) => notes.filter((note) => note.id !== parsedId))
        .then((filteredNotes) => this.write(filteredNotes))
    }
   
}

// export this Create class
module.exports = new Create();