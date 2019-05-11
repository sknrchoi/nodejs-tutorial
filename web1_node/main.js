var topic = require('./lib/topic');
var path = require('path');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var compression = require('compression');
var topicRouter = require('./route/topic');
var authorRouter = require('./route/author');

app.use(bodyParser.urlencoded({extended: false}));
app.use(compression());

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'view'));

app.use('/topic', topicRouter);
app.use('/author', authorRouter);

app.get('/', (request, response) => {
    topic.home(request, response);
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