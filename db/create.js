var fs = require('fs');
var util = require('util');
const notesData = require("./db.json");


const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);


class Create {

    read() {
        return readFileAsync("db/db.json", "UTF-8");
    }
    write(note) {
        return writeFileAsync("db/db.json", JSON.stringify(note));
    }

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
    
    removeNote(id) {
  
        var parsedId = JSON.parse(id);

        return this.getNotes()
        .then((notes) => notes.filter((note) => note.id !== parsedId))
        .then((filteredNotes) => this.write(filteredNotes))
    }
   
}

module.exports = new Create();