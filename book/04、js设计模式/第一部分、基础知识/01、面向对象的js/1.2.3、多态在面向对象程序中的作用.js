let renderMap = function(map) {
    if(map.show instanceof Function){
        map.show()
    }
};

let googleMap  = {
    show: function(){
        console.log('谷歌地图')
    }
};

let baiduMap = {
    show: function() {
        console.log('百度地图')
    }
};

renderMap(googleMap);
renderMap(baiduMap);