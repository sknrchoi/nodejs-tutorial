// refactoring
module.exports = {
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
    list : function (fileList) {
        var list = '<ul>';
    
        var i = 0;
        while(i < fileList.length) {
            list = list + `<li><a href="/?id=${fileList[i].id}">${fileList[i].title}</a></li>`;
            i ++;
        }
        list = list + '</ul>';
    
        return list;
    },
    authorSelect : function (authors, author_id) {
        var tag = '';
        var i = 0;
        while(i< authors.length) {
            var selected = '';

            if (authors[i].id === author_id) {
                selected = 'selected';
            }
            tag += `<option value="${authors[i].id}" ${selected}>${authors[i].name}</option>`;
            i++;
        }

        return `
            <select name="author">
            ${tag}
            </select>
        `;
    }
}