var express = require('express');
var router = express.Router();
var auth = require('../lib/auth');

module.exports = function(passport) {
    router.get('/login', (request, response) => {
        auth.login(request, response);
    });
    
    router.post('/login_process', 
        passport.authenticate('local', {
            successRedirect : '/',
            failureRedirect : '/auth/login',
            failureFlash : true,
            successFlash : true
        })
    );
    
    router.get('/logout', function(request, response) {
       auth.logout(request, response);
    });

    return router;
}
