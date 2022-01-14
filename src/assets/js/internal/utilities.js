Date.prototype.monthNames = [
    "January", "February", "March",
    "April", "May", "June",
    "July", "August", "September",
    "October", "November", "December"
];

Date.prototype.getMonthName = function() {
    return this.monthNames[this.getMonth()];
};
Date.prototype.getShortMonthName = function() {
    return this.getMonthName().substr(0, 3);
};

HTMLElement.prototype.clear = function() {
    while (this.lastChild) {
        this.removeChild(this.lastChild);
    }
}

function read_from_file_sync(path) {
    let text = null;

    $.ajax({
        type: "GET",
        url: path,
        cache: false,
        dataType: "text",
        success: function(t) {
            text = t;
        },
        async: false /* Making the ajax sync */
    });

    return text;
}

function findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    var items = location.search.substr(1).split("&");
    for (var index = 0; index < items.length; index++) {
        tmp = items[index].split("=");
        if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
    }
    return result;
}

/**
 * @param {String} HTML representing a single element
 * @return {Element}
 */
function htmlToElement(html) {
    var template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
}