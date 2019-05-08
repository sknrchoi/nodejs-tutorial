var db = require('./db');
var template = require('./template');
var qs = require('querystring');
var sanitize = require('./sanitize');
var sanitizeHtml = require('sanitize-html');

exports.home = function (request, response) {
    db.query(`SELECT * FROM topic`, function(error, topics) {
        var title = 'Welcome';
        var description = 'Hello node js';

        response.render('index', {
            title : title,
            description : description,
            topics : sanitize.topicDatafilter(topics)
        });
    });
}

exports.page = function (request, response) {
    var queryData = request.query;

    db.query(`SELECT * FROM topic`, function(error, topics) {
        if(error) {
            throw error;
        }

        db.query(`SELECT * FROM topic LEFT JOIN author ON topic.author_id=author.id WHERE topic.id=?`,[queryData.id] ,function(error2, topic) {
            if(error2) {
                throw error2;
            }
            
            console.log('topic = ', topic);

            var title = sanitizeHtml(topic[0].title);
            var description = sanitizeHtml(topic[0].description);
            var authorName = sanitizeHtml(topic[0].name);
            
            response.render('detail', {
                title : title,
                id : queryData.id,
                description : description,
                topics : sanitize.topicDatafilter(topics),
                authorName : authorName
            });
        });
    });
}

exports.create = function(request, response) {
    db.query(`SELECT * FROM topic`, function(error, topics) {
        db.query(`SELECT * FROM author`, function(error2, authors) {
            var title = 'WEB - create';
            var form = `
            <form action="/process_create" method="post">
                <p><input type="text" name="title" placeholder="title"></p>
                <p>
                    <textarea name="description" placeholder="description"></textarea>
                </p>
                <p>
                    ${template.authorSelect(authors)}
                </p>
                <p>
                    <input type="submit">
                </p>
            </form>
            `;
            response.render('form', {
                title : title,
                topics : sanitize.topicDatafilter(topics),
                form
            });
        });
    });
}

exports.create_process = function(request, response) {
    var body = "";
    // data이벤트에서 발생시킨 청크는 buffer로 문자열 데이터임.
    request.on('data', function(data) {
        body = body + data;
    });

    // 위에서 수집한 데이터를 파싱해서 body데이터를 가져옴.
    request.on('end', function() {
        var post = qs.parse(body);
        // post == { title: '3243', description: '24234234' }

        db.query(`INSERT INTO topic (title, description, created, author_id) VALUES(?, ?, NOW(), ?)`, 
        [post.title, post.description, post.author], function(error, result) {
            if(error) {
                throw error;
            }
            
            response.redirect(`/?id=${result.insertId}`);
        });
    });
}

exports.update = function(request, response) {
    var queryData = request.query;

    db.query(`SELECT * FROM topic`, function(error, topics) {
        if(error) {
            throw error;
        }
        
        db.query(`SELECT * FROM topic WHERE id=?`,[queryData.id] ,function(error2, topic) {
            if(error2) {
                throw error2;
            }

            db.query(`SELECT * FROM author`,[queryData.id] ,function(error2, authors) {
                var title = sanitizeHtml(topic[0].title);
                var form = `
                <form action="/process_update" method="post">
                    <input type="hidden" name="id" value="${topic[0].id}">
                    <p><input type="text" name="title" placeholder="title" value="${sanitizeHtml(topic[0].title)}"></p>
                    <p>
                        <textarea name="description" placeholder="description">${sanitizeHtml(topic[0].description)}</textarea>
                    </p>
                    <p>
                        ${template.authorSelect(authors, topic[0].author_id)}
                    </p>
                    <p>
                        <input type="submit">
                    </p>
                </form>
                `;
                response.render('form', {
                    title : title,
                    id : topic[0].id,
                    topics : sanitize.topicDatafilter(topics),
                    form
                });
            });
        });
    });
}

exports.update_process = function(request, response) {
    var body = "";
    // data이벤트에서 발생시킨 청크는 buffer로 문자열 데이터임.
    request.on('data', function(data) {
        body = body + data;
    });
    // 위에서 수집한 데이터를 파싱해서 body데이터를 가져옴.
    request.on('end', function() {
        var post = qs.parse(body);

        db.query(`UPDATE topic SET title=?, description=?, created=NOW(), author_id=? WHERE id=?`, 
        [post.title, post.description, post.author, post.id], function(error, result) {
            response.redirect(`/?id=${post.id}`);
        });
    });
}

exports.delete = function(request, response) {
    var body = "";

    // data이벤트에서 발생시킨 청크는 buffer로 문자열 데이터임.
    request.on('data', function (data) {
        body = body + data;
    });

    // 위에서 수집한 데이터를 파싱해서 body데이터를 가져옴.
    request.on('end', function () {
        var post = qs.parse(body);

        db.query(`DELETE FROM topic WHERE id=?`,
            [post.id], function (error, result) {
                if (error) {
                    throw error;
                }
                response.redirect(`/`);
            });
    });
}
