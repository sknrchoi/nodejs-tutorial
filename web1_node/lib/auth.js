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

// exports.login_process = function(request, response) {
//     var post = request.body;
//     var email = post.email;
//     var password = post.password;

//     db.query(`SELECT * FROM users WHERE email=? and password=?`, [email, password], function(error, user) {
        
//         if (error) {
//             throw error;
//         }

//         if (user.length > 0) {
//             request.session.is_logined = true;
//             request.session.nickname = user[0].nickname;
//             request.session.save(function() {
//                 response.redirect(`/`);
//             })
//         } else {
//             response.send('login fail');
//         }
//     });
// }