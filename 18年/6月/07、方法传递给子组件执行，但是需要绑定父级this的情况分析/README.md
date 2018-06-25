# 方法传递给子组件执行，但是需要绑定父级this的情况分析              

一个错误的示例：                
```jsx harmony
<Modal
    visible={modalType === 'relevanceCustomer'}
    title="关联主体"
    footer={null}
    width="75%"
    onCancel={()=>this.handleCancel()}
>
    {modalType === 'relevanceCustomer' ? <CaseDeclareDetailRelevanceCustomer handleCancel={this.handleCancel} modal={modal}/> : null}
</Modal>
```
如果希望这样传递方法给子组件，需要给这个组件，在constructor绑定this;                        
正确的示例如下：                        
```jsx harmony
constructor(props) {
    super(props);

    this.state = {
        agentList: [],                  //申报端口
        modalType: '',                  //模态框参数
    };

    this.handleCancel = this.handleCancel.bind(this);                           //绑定取消模态框的功能
}
```

----------------

第二种正确的示例为：              
```jsx harmony
<Modal
    visible={modalType === 'relevanceCustomer'}
    title="关联主体"
    footer={null}
    width="75%"
    onCancel={()=>this.handleCancel()}
>
    {modalType === 'relevanceCustomer' ?
        <CaseDeclareDetailRelevanceCustomer
            handleCancel={this.handleCancel}
            handleShowAddCustomer={() =>{
                this.setState({
                    modalType: 'addCustomer'
                });
            }}
            modal={modal}/> : null}
</Modal>
```
使用 `()=>{}`这种箭头函数的写法，也可以把this成功传递给子组件