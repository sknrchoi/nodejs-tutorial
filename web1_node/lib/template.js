var sanitizeHtml = require('sanitize-html');

// refactoring
module.exports = {
    authorSelect : function (authors, author_id) {
        var tag = '';
        var i = 0;
        while(i < authors.length) {
            var selected = '';

            if (authors[i].id === author_id) {
                selected = 'selected';
            }
            tag += `<option value="${authors[i].id}" ${selected}>${sanitizeHtml(authors[i].name)}</option>`;
            i++;
        }

        return `
            <select name="author">
            ${tag}
            </select>
        `;
    }
}