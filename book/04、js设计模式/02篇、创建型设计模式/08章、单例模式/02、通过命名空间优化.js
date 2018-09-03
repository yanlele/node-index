let Le = {
    g(id) {
        return document.getElementById(id)
    },
    css(id, key, value) {
        this.g(id).style[key] = value;
    },
    attr(id, key, value) {
        this.g(id)[key] = value;
    },
    html(id, value) {
        this.g(id).innerHeight = value;
    }
};