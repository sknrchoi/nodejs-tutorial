var db = require('./db');
var qs = require('querystring');
var sanitize = require('./sanitize');
var sanitizeHtml = require('sanitize-html');

exports.home = function (request, response) {
    db.query(`SELECT * FROM topic`, function(error, topics) {
        db.query(`SELECT * FROM author`, function(error2, authors) {

            var title = 'author';
            var form = `
                <form action="/author/process_create" method="post">
                    <p><input type="text" name="name" placeholder="name"></p>
                    <p>
                        <textarea name="profile" placeholder="profile"></textarea>
                    </p>
                    <p>
                        <input type="submit" value="submit">
                    </p>
                </form>
            `;
            response.render('author', {
                title,
                authors : sanitize.authorDatafilter(authors),
                topics : sanitize.topicDatafilter(topics),
                form
            });
        });
    });
}

exports.create_process = function(request, response) {
    var body = "";

    request.on('data', function(data) {
        body = body + data;
    });

    request.on('end', function() {
        var author = qs.parse(body);

        db.query(`INSERT INTO author (name, profile) VALUES(?, ?)`, 
        [author.name, author.profile], function(error, result) {
            if(error) {
                throw error;
            }
            
            response.redirect(`/author`);
            response.end();
        });
    });
}

exports.update = function(request, response) {
    var queryData = request.query;

    db.query(`SELECT * FROM topic`, function(error, topics) {
        if(error) {
            throw error;
        }
        
        db.query(`SELECT * FROM author`,function(error2, authors) {
            if(error2) {
                throw error2;
            }

            db.query(`SELECT * FROM author WHERE id=?`,[queryData.id] ,function(error3, author) {
                var title = 'author';
                var form = `
                    <form action="/author/process_update" method="post">
                        <input type="hidden" name="id" value="${author[0].id}">
                        <p><input type="text" name="name" placeholder="name" value="${sanitizeHtml(author[0].name)}"></p>
                        <p>
                            <textarea name="profile" placeholder="profile">${sanitizeHtml(author[0].profile)}</textarea>
                        </p>
                        <p>
                            <input type="submit" value="update">
                        </p>
                    </form>
                `;
                response.render('author', {
                    title,
                    authors : sanitize.authorDatafilter(authors),
                    topics : sanitize.topicDatafilter(topics),
                    form
                });
            });
        });
    });
}

exports.update_process = function(request, response) {
    var body = "";

    request.on('data', function(data) {
        body = body + data;
    });

    request.on('end', function() {
        var author = qs.parse(body);

        db.query(`UPDATE author SET name=?, profile=? WHERE id=?`, 
        [author.name, author.profile, author.id], function(error, result) {
            response.redirect(`/author`);
        });
    });
}

exports.delete = function(request, response) {
    var body = "";

    request.on('data', function (data) {
        body = body + data;
    });

    request.on('end', function () {
        var author = qs.parse(body);

        db.query(`DELETE FROM topic WHERE author_id=?`,
        [author.id], function (error, result) {
            if (error) {
                throw error;
            }

            db.query(`DELETE FROM author WHERE id=?`,
            [author.id], function (error2, result) {
                if (error2) {
                    throw error2;
                }
                response.redirect(`/author`);
            });
        });
    });
}
