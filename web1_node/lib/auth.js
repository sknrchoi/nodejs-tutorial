var db = require('./db');
var sanitize = require('./sanitize');

var authData = {
    email : 'test@test.com',
    password : '123456',
    nickname : 'testuser'
};

exports.login = function (request, response) {
    db.query(`SELECT * FROM topic`, function(error, topics) {
        var title = 'WEB - login';
        var form = `
        <form action="/auth/login_process" method="post">
        <p><input type="text" name="email" placeholder="email"></p>
        <p><input type="password" name="pwd" placeholder="password"></p>
        <p>
            <input type="submit" value="login">
        </p>
        </form>
        `;
        response.render('form', {
            title,
            topics : sanitize.topicDatafilter(topics),
            form
        });
    });
}

exports.login_process = function(request, response) {
    var post = request.body;
    var email = post.email;
    var password = post.password;
    var nickname = post.nickname;

    if (email === authData.email && password === authData.password) {
        response.send('login success');
    } else {
        response.send('login fail');
    }

}