const expect = require('chai').expect;
const diff = require('../../18年/12月/06、深度对比算法研究/buildDiff');


let lhs = {
    name: 'my object',
    description: 'it\'s an object!',
    details: {
        it: 'has',
        an: 'array',
        with: ['a', 'few', 'elements']
    }
};

let rhs = {
    name: 'my',
    description: 'it\'s an object!',
    details: {
        it: 'has',
        an: 'array',
        with: ['a', 'few', 'more', 'elements', { than: 'before' }]
    }
};

let leftArr = [
    {
        name: 1,
        age: 1,
        id: 1
    },
    {
        name: 2,
        age: 2,
        id: 2,
        child: [{
            name: 6,
            age: 6,
            id: 6
        }]
    },
    {
        name: 3,
        age: 3,
        id: 3
    }
];

let rightArr = [
    {
        name: 1,
        age: 1,
        id: 1
    },
    {
        name: 2,
        age: 2,
        id: 2
    },
    {
        name: 3,
        age: 3,
        id: 3,
        child: [{
            name: 4,
            age: 4,
            id: 4
        }]
    }
];



module.exports = function() {
    describe('对比两个对象是否相同', function () {
        it('两个对象不同', function () {
            let changes = diff(lhs, rhs);
            expect(changes).is.length.above(0);
            console.log(changes);
        });

        it.only('对比两个数组对象的不同', function () {
            let changes = diff(leftArr, rightArr);
            expect(changes).length.above(0);
            console.log(changes)
        })
    })
}