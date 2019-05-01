var db = require('./db');
var template = require('./template');
var url = require('url');
var qs = require('querystring');

exports.home = function (request, response) {
    db.query(`SELECT * FROM topic`, function(error, topics) {
        var title = 'Welcome';
        var description = 'Hello node js';
        var list = template.list(topics);
        var html = template.html(title, list,
            `<h2>${title}</h2>${description}`,
            `<a href="/create">create</a>`);
        response.writeHead(200);   
        response.end(html);
    });
}

exports.page = function (request, response) {
    var _url = request.url;
    var queryData = url.parse(_url, true).query;

    db.query(`SELECT * FROM topic`, function(error, topics) {
        if(error) {
            throw error;
        }
        
        db.query(`SELECT * FROM topic LEFT JOIN author ON topic.author_id=author.id WHERE topic.id=?`,[queryData.id] ,function(error2, topic) {
            if(error2) {
                throw error2;
            }

            var title = topic[0].title;
            var description = topic[0].description;
            var list = template.list(topics);
            var html = template.html(title, list, 
            `
            <h2>${title}</h2>
            ${description}
            <p>by ${topic[0].name}</p>
            `,
            `<a href="/create">create</a>
             <a href="/update?id=${queryData.id}">update</a>
             <form action="/delete_process" method="post">
                 <input type="hidden" name="id" value="${queryData.id}">
                 <input type="submit" value="delete">
             </form>
            `
            );
            response.writeHead(200);   
            response.end(html);
        });
    });
}

exports.create = function(request, response) {
    db.query(`SELECT * FROM topic`, function(error, topics) {
        db.query(`SELECT * FROM author`, function(error2, authors) {
            var title = 'WEB - create';
            var list = template.list(topics);
            var html = template.html(title, list,
                `<form action="http://localhost:3000/process_create" method="post">
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
                </form>`,
                ``);
            response.writeHead(200);   
            response.end(html);
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
            
            response.writeHead(302, {Location: `/?id=${result.insertId}`});   
            response.end();
        });
    });
}

exports.update = function(request, response) {
    var _url = request.url;
    var queryData = url.parse(_url, true).query;

    db.query(`SELECT * FROM topic`, function(error, topics) {
        if(error) {
            throw error;
        }
        
        db.query(`SELECT * FROM topic WHERE id=?`,[queryData.id] ,function(error2, topic) {
            if(error2) {
                throw error2;
            }

            db.query(`SELECT * FROM author`,[queryData.id] ,function(error2, authors) {
                var list = template.list(topics);
                var html = template.html(topic[0].title, list, 
                    `<form action="/process_update" method="post">
                        <input type="hidden" name="id" value="${topic[0].id}">
                        <p><input type="text" name="title" placeholder="title" value="${topic[0].title}"></p>
                        <p>
                            <textarea name="description" placeholder="description">
                                ${topic[0].description}
                            </textarea>
                        </p>
                        <p>
                            ${template.authorSelect(authors, topic[0].author_id)}
                        </p>
                        <p>
                            <input type="submit">
                        </p>
                    </form>`,
                    `<a href="/create">create</a><a href="/update?id=${topic[0].id}">update</a>`
                );
                response.writeHead(200);   
                response.end(html);
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
            response.writeHead(302, {Location: `/?id=${post.id}`});   
            response.end();
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
                response.writeHead(302, { Location: `/` });
                response.end();
            });
    });
}