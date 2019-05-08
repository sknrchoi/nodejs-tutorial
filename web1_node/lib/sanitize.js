var sanitizeHtml = require('sanitize-html');

exports.topicDatafilter = function(topics) {
    var i=0;

    while(i<topics.length) {
        var topic = topics[i];

        topic.title = sanitizeHtml(topic.title);
        topic.description = sanitizeHtml(topic.description);

        i++;
    }

    return topics;
}

exports.authorDatafilter = function(authors) {
    var i=0;

    while(i<authors.length) {
        var author = authors[i];

        author.name = sanitizeHtml(author.name);
        author.profile = sanitizeHtml(author.profile);

        i++;
    }

    return authors;
}