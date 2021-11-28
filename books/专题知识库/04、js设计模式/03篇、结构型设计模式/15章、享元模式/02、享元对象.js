let Flyweight = function () {
    let created = [];
    function create() {
        let dom = document.createElement('div');
        document.getElementById('container').appendChild(dom);
        created.push(dom);
        return dom;
    }
    return {
        getDiv: function () {
            if(created.length < 5) {
                return create()
            } else {
                // 获取第一个元素，并且插入到最后
                let div = created.shift();
                created.push(div);
                return div;
            }
        }
    }
};

module.exports = Flyweight