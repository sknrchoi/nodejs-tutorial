var express = require('express');
var router = express.Router();
var auth = require('../lib/auth');

router.get('/login', (request, response) => {
    auth.login(request, response);
});

// router.post('/login_process', (request, response) => {
//     auth.login_process(request, response);
// });

module.exports = router;

