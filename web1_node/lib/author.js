var db = require('./db');
var template = require('./template');

exports.home = function (request, response) {
    db.query(`SELECT * FROM topic`, function(error, topics) {
        db.query(`SELECT * FROM author`, function(error2, authors) {
            
            var title = 'author';
            var html = `
                ${template.authorTable(authors)}
                <style>
                    table {
                        border-collapse: collapse;
                    }
                    td {
                        border : 1px solid black;
                    }
                </style>
            `;
            
            response.render('common', {
                title : title,
                html : html,
                topics : topics
            });
        });
    });
}