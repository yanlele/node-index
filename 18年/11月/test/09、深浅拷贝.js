/**
 * create by yanlele
 * create time 2018-11-26 17:54
 */


function extendDeeply(p, c={}) {
    for (let prop in p) {
        if(typeof p[prop] === 'object') {
            c[prop] = (p[prop].constructor === Array) ? [] : {};
            extendDeeply(p[prop], c[prop])
        } else {
            c[prop] = p[prop]
        }
    }
    return c;
}
