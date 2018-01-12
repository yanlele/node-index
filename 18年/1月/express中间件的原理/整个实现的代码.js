function App(){
    if(!(this instanceof App)){
        return new App();
    }
    this.init();
}

App.prototype={
    constructor:App,
    init:function(){
        this.request={
            //模拟一个request
        };
        this.response={};
        this.chain=[];
        this.index=0;
    },
    use:function(handler){
        this.chain.push(handler);
    },
    next:function(){
        if(this.index>=this.chain.length){
            return false;
        }
        let middleware=this.chain[this.index];
        this.index++;
        middleware(this.request,this.response,this.next.bind(this));
    }
};