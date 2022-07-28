const express = require('express');
const app = express();
const PORT = process.env.PORT || 4444;
const path = require('path');
const api_routes = require('./routes/api_routes');

app.use(express.static(path.join(__dirname, './Develop/public/')));

app.use(express.urlencoded({extended: true}));

app.use(express.json());

app.use('/', api_routes);

app.get('/notes', (request, response) => {
    response.sendFile(path.join(__dirname, './Develop/public/notes.html'))
});

app.listen(PORT, () => {
    console.log(`listing on port ${PORT}`);
});