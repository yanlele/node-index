# react 高阶函数示例

如上的封装方式，在index.js中，可以直接通过this.props.test(),就可以直接调用高阶函数的方法和属性了！


另外一种使用内部from 抛出到外层父级的一个示例：   
```jsx
render() {
    let {modal, confirmPayment} = this.props;
    return (
        <div className="pay-confirm-payment">
            <Row>
                <Col span={12}>
                    <h1>确认支付明细</h1>
                </Col>
                <Col span={4} offset={8} className="text-right">
                    <Button type="primary" onClick={this.handleSubmit} loading={modal.loadingButton} disabled={!(confirmPayment.content.length > 0) || modal.loadingButton}>提交</Button>
                </Col>
            </Row>
            {confirmPayment.content.length > 0 ?
                <PayConfirmPaymentAddForm
                    confirmPayment={confirmPayment}
                    handlePageClick={this.handlePageClick}
                    wrappedComponentRef={(form)=> this.form = form}/>
                : null}
        </div>
    );
}
```
