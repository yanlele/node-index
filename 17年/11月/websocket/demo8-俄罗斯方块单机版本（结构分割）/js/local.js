var Local=function(){
    //游戏对象
    var game;

    //开始方法
    var start=function(){
        var doms={
            gameDiv:document.getElementById('game'),
            nextDiv:document.getElementById('next')
        }
        game=new Game();
        game.init(doms);
    }

    //导出api
    this.start=start;
};