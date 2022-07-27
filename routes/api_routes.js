const note_router = require('express').Router();
const fs = require('fs');
const path = require('path');
const db_path = path.join(__dirname, '../db/db.json');
const note_path = path.join(__dirname, './public/notes.html')


// write functions to get front end working properly.

function getNoteData() {
    return fs.promises
        .readFile(db_path, 'utf8')
        .then(data =>JSON.parse(data));
};

// route user to the /notes section which is the notes.html
note_router.get('/notes', (request, response) =>{
    request
    response
});



// note_router.get('/notes')





// We will need to use UUID to generate IDs for certain elements


module.exports = note_router;