var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');

// refactoring
var template = {
    html : function (title, list, description, controll) {
        return `
            <!doctype html>
            <html>
                <head>
                    <title>WEB1 - ${title}</title>
                    <meta charset="utf-8">
                </head>
                <body>
                    <h1><a href="/">WEB</a></h1>
                    ${list}
                    ${controll}
                    ${description}
                </body>
            </html>
        `;
    },
    list : function telplateList(fileList) {
        var list = '<ul>';
    
        var i = 0;
        while(i < fileList.length) {
            list = list + `<li><a href="/?id=${fileList[i]}">${fileList[i]}</a></li>`;
            i ++;
        }
        list = list + '</ul>';
    
        return list;
    }
}

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    
    console.log("pathname : " + pathname);

    if (pathname === '/') {
        if (queryData.id === undefined) {
            
            fs.readdir('./data', function(error, filelist) {
                console.log(filelist);
                
                var title = 'Welcome';
                var description = 'Hello node js';
                var list = template.list(filelist);
                var html = template.html(title, list,
                    `<h2>${title}</h2>${description}`,
                    `<a href="/create">create</a>`);
                response.writeHead(200);   
                response.end(html);

            })
            
        } else {
            fs.readdir('./data', function(error, filelist) {
                fs.readFile(`data/${queryData.id}`, 'utf8', function(err, description) {
                    var title = queryData.id;
                    var list = template.list(filelist);
                    var html = template.html(title, list, `<h2>${title}</h2>${description}`,
                    `<a href="/create">create</a>
                     <a href="/update?id=${title}">update</a>
                     <form action="/delete_process" method="post">
                         <input type="hidden" name="id" value="${title}">
                         <input type="submit" value="delete">
                     </form>
                    `
                    );
                    response.writeHead(200);   
                    response.end(html);
                });            
            });
        }
        
    } else if(pathname === '/create') {
            
        fs.readdir('./data', function(error, filelist) {
            console.log(filelist);
            
            var title = 'WEB - create';
            var list = template.list(filelist);
            var description = `
                <form action="http://localhost:3000/process_create" method="post">
                    <p><input type="text" name="title" placeholder="title"></p>
                    <p>
                        <textarea name="description" placeholder="description"></textarea>
                    </p>
                    <p>
                        <input type="submit">
                    </p>
                </form>
            `;
            var html = template.html(title, list, description, '');

            response.writeHead(200);   
            response.end(html);

        })
    } else if(pathname === '/process_create') {
        var body = "";
        // data이벤트에서 발생시킨 청크는 buffer로 문자열 데이터임.
        request.on('data', function(data) {
            body = body + data;
        });
        // 위에서 수집한 데이터를 파싱해서 body데이터를 가져옴.
        request.on('end', function() {
            var post = qs.parse(body);
            // post == { title: '3243', description: '24234234' }
            var title = post.title;
            var description = post.description;
            console.log(post);
            
            // file write
            fs.writeFile(`data/${title}`, description, 'utf8', function(err) {
                console.log('[info] file write success');
                response.writeHead(200);
                // redirection
                response.writeHead(302, {Location : `/?id=${title}`});
                response.end('success'); // response to client
            })

        });
    } else if(pathname === '/update') {
        fs.readdir('./data', function(error, filelist) {
            fs.readFile(`data/${queryData.id}`, 'utf8', function(err, description) {
                var title = queryData.id;
                var list = template.list(filelist);
                var description = `
                    <form action="/process_update" method="post">
                        <input type="hidden" name="id" value="${title}">
                        <p><input type="text" name="title" placeholder="title" value="${title}"></p>
                        <p>
                            <textarea name="description" placeholder="description">
                                ${description}
                            </textarea>
                        </p>
                        <p>
                            <input type="submit">
                        </p>
                    </form>
                `;
                var html = template.html(title, list, description, '');
    
                response.writeHead(200);   
                response.end(html);
            });
        })
    } else if(pathname === '/process_update') {
        var body = "";
        // data이벤트에서 발생시킨 청크는 buffer로 문자열 데이터임.
        request.on('data', function(data) {
            body = body + data;
        });
        // 위에서 수집한 데이터를 파싱해서 body데이터를 가져옴.
        request.on('end', function() {
            var post = qs.parse(body);
            var id = post.id;
            var title = post.title;
            var description = post.description;
            console.log(post);
            
            fs.rename(`data/${id}`, `data/${title}`, 
            function(error) {
                // file write
                fs.writeFile(`data/${title}`, description, 'utf8', function(err) {
                    console.log('[info] file write success');
                    response.writeHead(200);
                    // redirection
                    response.writeHead(302, {Location : `/?id=${title}`});
                    response.end('success'); // response to client
                })
            });

        });
    } else if(pathname === '/delete_process') {
        var body = "";
        // data이벤트에서 발생시킨 청크는 buffer로 문자열 데이터임.
        request.on('data', function(data) {
            body = body + data;
        });
        // 위에서 수집한 데이터를 파싱해서 body데이터를 가져옴.
        request.on('end', function() {
            var post = qs.parse(body);
            var id = post.id;

            fs.unlink(`data/${id}`, function(err) {
                response.writeHead(302, {Location : `/`});   
                response.end();
            })
        });
    } else {   
        response.writeHead(404);   
        response.end('Not found');
    }
});

app.listen(3000);