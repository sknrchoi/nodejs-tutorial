var topic = require('./lib/topic');
var express = require('express');
var app = express();

app.get('/', (request, response) => {
    if (request.query.id === undefined) {
        topic.home(request, response);
    } else {
        topic.page(request, response);
    }
});

app.get('/create', (request, response) => {
    topic.create(request, response);
});

app.post('/process_create', (request, response) => {
    topic.create_process(request, response);
});

app.get('/update', (request, response) => {
    topic.update(request, response);
});

app.post('/process_update', (request, response) => {
    topic.update_process(request, response);
});

app.get('/delete_process', (request, response) => {
    topic.delete(request, response);
});

// Route error event handler
app.use((request, response, next) => {
    throw new Error(request.url + ' Not Found');
});

app.use((error, request, response, next) => {
    console.log(error);
    response.send(error.message);
});

app.listen(3000);