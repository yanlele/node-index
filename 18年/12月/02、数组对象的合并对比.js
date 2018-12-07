let arr1 = [
    {
        name: '1',
        id: 1
    },
    {
        name: '2',
        id: 2,
        child: [
            {
                name: '2-1',
                id: 2001,
            },
            {
                name: '2-2',
                id: 2002
            }
        ]
    },
    {
        name: '3',
        id: 3
    }
];

let arr2 = [
    {
        name: '1',
        id: 1
    },
    {
        name: '2',
        id: 2,
        child: [
            {
                name: '2-5',
                id: 2005,
            },
            {
                name: '2-2',
                id: 2002
            }
        ]
    },
    {
        name: '3',
        id: 3
    }
];


let compare = function (arr1, arr2) {
    arr1.map(function (item, index) {
        arr2.map(function (item2, index2) {
            if(item['id'] !== item2['id']) {
                console.log(item);
            }
        })
    })
};

compare(arr1, arr2)