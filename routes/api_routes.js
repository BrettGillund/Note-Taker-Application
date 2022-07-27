const note_router = require('express').Router();
const fs = require('fs/promises');
const path = require('path');
const db_path = path.join(__dirname, '../db/db.json');
const note_path = path.join(__dirname, './public/notes.html');


// write functions to get front end working properly.

function getNoteData() {
    return fs
        .readFile(db_path, 'utf8')
        .then(data =>JSON.parse(data));
};

// route user to the /notes section which is the notes.html
note_router.get('/notes', (request, response) =>{

    getNoteData().then((response) => (
        response.status(200).json({
            message: 'Notes received'
        }).catch((err) => (
            console.log(err)
        ))
    ))
    // console.log(request);
    // console.log(response);
    // console.log(getNoteData());
});





// note_router.get('/notes')





// We will need to use UUID to generate IDs for certain elements


module.exports = note_router;