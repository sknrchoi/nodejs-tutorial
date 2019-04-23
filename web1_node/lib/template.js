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
            list = list + `<li><a href="/?id=${fileList[i]}">${fileList[i]}</a></li>`;
            i ++;
        }
        list = list + '</ul>';
    
        return list;
    }
}