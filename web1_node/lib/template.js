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
            tag += `<option value="${authors[i].id}" ${selected}>${authors[i].name}</option>`;
            i++;
        }

        return `
            <select name="author">
            ${tag}
            </select>
        `;
    },
    authorTable : function (authors) {
        var tag = '<table>';
        var i = 0;

        while(i <authors.length) {
            tag += `
                <tr>
                    <td>${authors[i].name}</td>
                    <td>${authors[i].profile}</td>
                    <td>update</td>
                    <td>delete</td>
                </tr>
            `;

            i++;
        }

        tag += '</table>';
        
        return tag;
    }
}