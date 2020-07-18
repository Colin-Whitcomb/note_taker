var fs = require('fs');
var util = require('util');
const { parse } = require('path');
var uniqid = require('uniqid');

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
        return this.read().then( (notes) => { 
            var something;
            try {
                something = [].concat(JSON.parse(notes));
            } catch (err) {
                something = [];
            }
            return something;
        });
    }

    addNotes(title, text) {
        // console.log("record: " + record);
        // console.log("note:" + note);
        const newNote = { 
            title: title,
            text: text, };
        if (!title || !text){
            throw error;
        } 
        
        // const newNote = { 
        //     note.title, 
        //     note.text,};  
        return this.getNotes()
        .then((notes) => [...notes, newNote])
        .then((updateNotes) => this.write(updateNotes))
        .then(() => (newNote))
    }
    
    removeNote(title) {
        return this.getNotes()
        .then((notes) => notes.filter((note) => note.title !== title))
        .then((filteredNotes) => this.write(filteredNotes));
    }
   
}

module.exports = new Create();