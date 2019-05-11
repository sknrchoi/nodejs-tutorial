var express = require('express');
var router = express.Router();
var topic = require('../lib/topic');

router.get('/page/:pageId', (request, response) => {
    topic.page(request, response);
});

router.get('/create', (request, response) => {
    topic.create(request, response);
});

router.post('/process_create', (request, response) => {
    topic.create_process(request, response);
});

router.get('/update/:pageId', (request, response) => {
    topic.update(request, response);
});

router.post('/process_update', (request, response) => {
    topic.update_process(request, response);
});

router.post('/delete_process', (request, response) => {
    topic.delete(request, response);
});

module.exports = router;