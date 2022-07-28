const express = require('express');
const note_router = express.Router();
const fs = require('fs');
const path = require('path');
const uuid = require('uuid').v4;
const db_path = path.join(__dirname, '../Develop/db/db.json');

note_router.get('/notes', (request, response) => {
    response.sendFile(path.join(__dirname, '../Develop/public/notes.html'))
});

function getData() {
    return fs.promises.readFile(db_path, 'utf8')
        .then(data => JSON.parse(data));
};

note_router.get('/api/notes', (request, response) => {
    getData()
        .then(data => {
                response.json(data)
        })
        .catch(err => console.log(err))
});

// 
note_router.post('/api/notes', (request, response) =>{
    getData()
        .then(note_data => {
            console.log(note_data)
            const fresh_note = request.body;
            fresh_note.id = uuid().slice(0, 4);
            note_data.push(fresh_note);
            fs.promises.writeFile(db_path, JSON.stringify(note_data, null, 2))
                .then(() => {
                    console.log('Note received')
                    response.json(note_data)
                })
                .catch((err) => console.log(err))
    })
});


// note_router.get('/notes')


// We will need to use UUID to generate IDs for certain elements


//Export data below.
module.exports = note_router;