var path = require('path');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var compression = require('compression');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var dbconfig = require('./config/dbconfig');
var flash = require('connect-flash');

// Third-party middleware
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(compression());

// View engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'view'));

// Session
app.use(session({
    secret: 'asadlfkj!@#!@#dfgasdg',
    store: new MySQLStore(dbconfig),
    resave: false,
    saveUninitialized: true
}));

app.use(flash());

var passport = require('./lib/passport')(app);

// To access user session in template
app.use(function(request, response, next) {
    console.log("[Info] user = ", request.user);
    if(request.user) {
        response.locals.user = request.user;
    }
    
    next();
});

var topicRouter = require('./route/topic');
var authorRouter = require('./route/author');
var indexRouter = require('./route/index');
var authRouter = require('./route/auth')(passport);

 // Router
app.use('/topic', topicRouter);
app.use('/author', authorRouter);
app.use('/', indexRouter);
app.use('/auth', authRouter);

// Route error event handler
app.use((request, response, next) => {
    throw new Error(request.url + ' Not Found');
});

app.use((error, request, response, next) => {
    console.log(error);
    response.send(error.message);
});

app.listen(3000);