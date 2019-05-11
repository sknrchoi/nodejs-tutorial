var topic = require('./lib/topic');
var author = require('./lib/author');
var path = require('path');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var compression = require('compression');

app.use(bodyParser.urlencoded({extended: false}));
app.use(compression());

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'view'));

app.get('/', (request, response) => {
    topic.home(request, response);
});

app.get('/page/:pageId', (request, response) => {
    topic.page(request, response);

});

app.get('/create', (request, response) => {
    topic.create(request, response);
});

app.post('/process_create', (request, response) => {
    topic.create_process(request, response);
});

app.get('/update/:pageId', (request, response) => {
    topic.update(request, response);
});

app.post('/process_update', (request, response) => {
    topic.update_process(request, response);
});

app.get('/delete_process', (request, response) => {
    topic.delete(request, response);
});

app.get('/author', (request, response) => {
    author.home(request, response);
});

app.post('/author/process_create', (request, response) => {
    author.create_process(request, response);
});

app.get('/author/update/:authorId', (request, response) => {
    author.update(request, response);
});

app.post('/author/process_update', (request, response) => {
    author.update_process(request, response);
});

app.post('/author/delete', (request, response) => {
    author.delete(request, response);
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