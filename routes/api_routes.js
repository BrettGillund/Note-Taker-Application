const express = require('express');
const note_router = express.Router();
const fs = require('fs');
const path = require('path');
const uuid = require('uuid').v4;
const db_path = path.join(__dirname, '../Develop/db/db.json');

//router to load note page.
note_router.get('/notes', (request, response) => {
    response.sendFile(path.join(__dirname, '../Develop/public/notes.html'))
});

//retreive note function.
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

// create a new note.
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

//Deletes saved notes
note_router.delete('/api/notes/:id',(request, response) => {
    getData()
        .then(note_data => {
            const id = request.params.id
            const obj = note_data.find(dbNote => dbNote.id === id)
            const index = note_data.indexOf(obj)

            note_data.splice(index, 1)

            fs.promises.writeFile(db_path, JSON.stringify(note_data, null, 2))
                .then(() => response.json(note_data))
                .catch((err) => console.log(err))
        })
});



//Export data below.
module.exports = note_router;