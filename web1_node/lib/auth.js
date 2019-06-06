var db = require('./db');
var sanitize = require('./sanitize');

exports.login = function (request, response) {
    var fmsg = request.flash();
    var feedback = '';
   
    if (fmsg.error) {
        feedback = fmsg.error;
    }

    db.query(`SELECT * FROM topic`, function(error, topics) {
        var title = 'WEB - login';
        var form = `
            <div style = "color:red">${feedback}</div>
            <form action="/auth/login_process" method="post">
            <p><input type="text" name="email" placeholder="email"></p>
            <p><input type="password" name="password" placeholder="password"></p>
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

exports.logout = function (request, response) {
    request.logout();
    request.session.save(function() {
        response.redirect('/');
    });
}

exports.register = function (request, response) {
    var fmsg = request.flash();
    var feedback = '';
   
    if (fmsg.error) {
        feedback = fmsg.error;
    }

    db.query(`SELECT * FROM topic`, function(error, topics) {
        var title = 'WEB - login';
        var form = `
            <div style = "color:red">${feedback}</div>
            <form action="/auth/register_process" method="post">
            <p><input type="text" name="email" placeholder="email"></p>
            <p><input type="password" name="password" placeholder="password"></p>
            <p><input type="password2" name="password2" placeholder="password"></p>
            <p><input type="text" name="nickName" placeholder="display name"></p>
            <p>
                <input type="submit" value="register">
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

