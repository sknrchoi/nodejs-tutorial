var path = require('path');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var compression = require('compression');
var db = require('./lib/db');
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
var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

// Set passport middleware in Express version 4.x
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password'
    }, 
    (username, password, done) => {
        console.log('[info] LocalStrategy : ', username, password);
    
        db.query(`SELECT * FROM users WHERE email=? and password=?`, [username, password], function(error, user) {
            
            if (error) {
                done(error)
            }
            
            if (user.length > 0) {
                done(null, user[0]);
            } else {
                done(null, false, {message: 'User not exist'});
            }
        });
    })
);

// Save user info to session when user login sucess
passport.serializeUser(function(user, done) {
    // user argument is returned value at LocalStrategy authentication function
    console.log('[info] serializeUser', user);
    done(null, user.email);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

app.post('/auth/login_process', 
    passport.authenticate('local', {
        successRedirect : '/',
        failureRedirect : '/auth/login'
    })
);

app.get('/auth/logout', function(request, response) {
    request.logout();
    response.redirect('/');
});

// View engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'view'));

// To access user session in template
app.use(function(request, response, next) {
    response.locals.user = request.session.passport.user;
    next();
});

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