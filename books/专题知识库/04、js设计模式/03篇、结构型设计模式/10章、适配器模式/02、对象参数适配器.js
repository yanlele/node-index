function doSomeThing(obj) {
    let _adapter = {
        name: 'yanle',
        title: 'no game no life',
        age: 26,
        color: 'prink',
        size: 100,
        prize: 50
    };
    for(let i in _adapter) {
        _adapter[i] = obj[i] || _adapter[i]
    }

    // do something
}