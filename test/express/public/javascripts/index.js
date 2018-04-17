console.log(123);

$.ajax({
    url: '/api/test.json',
    type: 'post',
    data: {
        name: 'yanle',
        age: 35
    },
    dataType: 'json'
}).done(function(res) {
    console.log(res)
});