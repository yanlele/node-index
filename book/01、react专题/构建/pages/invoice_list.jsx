/* eslint-disable react/jsx-no-target-blank */
import React, {Component} from 'react';
import {push} from 'react-router-redux';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Button, message} from 'antd';

// mapStateToProps
function propMap(state, ownProps) {
    return {
        modal: state.modal,
        routing: ownProps
    };
}

class InvoiceList extends Component {
    constructor() {
        super();
        this.state = {
            invoiceListData: {}
        };
        this.handleGetList = this.handleGetList.bind(this);
    }

    componentDidMount() {
        // 每次刷新空拉数据一次
        this.handleGetList();
    }

    render() {
        const {routing, modal} = this.props;
        return (
            <div className="app-reimbursement-invoice-list">
                <ReimbursementHeaderNav current="invoice-list"/>

                <ReimbursementInvoiceSearchForm defaultValue={getQuery(routing)} loading={modal.loading} onSubmit={this.handleGetList}/>
                <hr/>
                <Button type="primary" className="m-b-lg">
                    <a href={getProjectUrl('self', getPath('/reimbursement/invoice-add/'))} target="_blank">新增发票</a>
                </Button>

                <ReimbursementInvoiceList
                    invoiceListData={this.state.invoiceListData}
                    handleGetList={this.handleGetList}
                />
            </div>
        );
    }

    // 点击查询数据
    handleGetList(filters, type) {
        console.log('点击查询数据')
    }
}
InvoiceList.propTypes = {
    routing: PropTypes.object.isRequired,
    modal: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
};
export default connect(propMap)(InvoiceList);
