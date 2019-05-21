var path = require('path');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var compression = require('compression');
var topicRouter = require('./route/topic');
var authorRouter = require('./route/author');
var indexRouter = require('./route/index');
var authRouter = require('./route/auth');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var dbconfig = require('./lib/dbconfig');

// Third-party middleware
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(compression());

// Session
app.use(session({
    secret: 'asadlfkj!@#!@#dfgasdg',
    store: new MySQLStore(dbconfig),
    resave: false,
    saveUninitialized: true
}));

// Passport Load (It should be done after session initialize.)
var passport = require('passport')
    , LocalStrategy = require('passport-local')
    .Strategy;

app.post('/auth/login_process', passport.authenticate('local', {
    successRedirect : '/',
    failureRedirect : '/auth/login'
}));

// View engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'view'));

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