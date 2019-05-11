var express = require('express');
var router = express.Router();
var author = require('../lib/author');

router.get('/', (request, response) => {
    author.home(request, response);
});

router.post('/process_create', (request, response) => {
    author.create_process(request, response);
});

router.get('/update/:authorId', (request, response) => {
    author.update(request, response);
});

router.post('/process_update', (request, response) => {
    author.update_process(request, response);
});

router.post('/delete', (request, response) => {
    author.delete(request, response);
});

module.exports = router;