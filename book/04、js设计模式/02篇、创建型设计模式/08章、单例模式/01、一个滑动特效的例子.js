function g(id) {
    return document.getElementById(id)
}

function css(id, key, value) {
    g(id).style[key] = value;
}
function attr(id, key, value) {
    g(id)[key] = value;
}
function html(id, value) {
    g(id).innerHeight = value;
}
