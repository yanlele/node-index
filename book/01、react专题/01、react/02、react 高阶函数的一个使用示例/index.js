import React, {Component} from 'react'
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import './index.less'
import axios from 'axios'
import wrapWithUsername  from './mixins'

@wrapWithUsername
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            price: '',
            goodName: '',
            payee: '',
            bankName: '',
            bankType: '',
            bankCardNo: '',

            /*错误信息的提示*/
            open: false
        }
    }


    /*错误信息控制*/
    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };



    /*注册流程*/
    toSubmit() {
        for (let [key, value] of Object.entries(this.state)) {
            if (key !== 'open') {
                if (value.length === 0) {
                    this.handleOpen();
                    return
                }
            }
        }

        axios.post('/registry.json', {
            ...this.state
        }).then(res => {
            this.props.history.push('/home')
        })
    }

    toSubmitAndTest() {
        axios.post('/registry.json', {
            ...this.state
        }).then(res => {

            this.props.history.push('/material')
        })
    }

    inputHandler(e) {
        // console.log(e.target.name);
        // console.log(e.target.value);

        if (e.target.name === 'username') {
            this.setState({
                username: e.target.value
            });
        } else if (e.target.name === 'password') {
            this.setState({
                password: e.target.value
            });
        } else if (e.target.name === 'price') {
            this.setState({
                price: e.target.value
            });
            this.setState({
                goodName: e.target.value
            });
        } else if (e.target.name === 'goodName') {
            this.setState({
                goodName: e.target.value
            });
        } else if (e.target.name === 'payee') {
            this.setState({
                payee: e.target.value
            })
        } else if (e.target.name === 'bankName') {
            this.setState({
                bankName: e.target.value
            })
        } else if (e.target.name === 'bankType') {
            this.setState({
                bankType: e.target.value
            })
        } else if (e.target.name === 'bankCardNo') {
            this.setState({
                bankCardNo: e.target.value
            })
        }
    }


    render() {
        const actions = [
            <FlatButton
                label="确定"
                primary={true}
                onClick={this.handleClose}
            />,
        ];

        return (
            <div className='container'>
                <h3>初始化接口数据</h3>
                <form id='form'>
                    <TextField
                        floatingLabelText="用户名"
                        name='username'
                        onChange={this.inputHandler.bind(this)}
                    />


                    <TextField
                        floatingLabelText="密码"
                        name='password'
                        type='password'
                        onChange={this.inputHandler.bind(this)}
                    />

                    <TextField
                        floatingLabelText="价格"
                        name='price'
                        onChange={this.inputHandler.bind(this)}
                    />

                    <TextField
                        floatingLabelText="商品名称"
                        name='goodName'
                        onChange={this.inputHandler.bind(this)}
                    />

                    <TextField
                        floatingLabelText="收款方"
                        name='payee'
                        onChange={this.inputHandler.bind(this)}
                    />

                    <TextField
                        floatingLabelText="银行名称"
                        name='bankName'
                        onChange={this.inputHandler.bind(this)}
                    />

                    <TextField
                        floatingLabelText="银行卡类型"
                        name='bankType'
                        onChange={this.inputHandler.bind(this)}
                    />

                    <TextField
                        floatingLabelText="银行卡卡号"
                        name='bankCardNo'
                        onChange={this.inputHandler.bind(this)}
                    />
                </form>


                <hr/>

                <FlatButton
                    onClick={this.toSubmit.bind(this)}
                    style={{
                        border: '1px solid #AEEEEE',
                        margin: '5px'
                    }}
                    label="注册流程-提交表单数据之后去主体项目"
                    primary={true}/><br/>

                <FlatButton
                    onClick={this.handleOpen}
                    primary={true}
                    style={{
                        border: '1px solid #AEEEEE',
                        margin: '5px'
                    }}
                    label='登录流程-只用输入用户名和密码就可以去主体项目了'/><br/>

                <FlatButton
                    onClick={this.toSubmitAndTest.bind(this)}
                    style={{
                        border: '1px solid #CD2990',
                        margin: '5px'
                    }}
                    label="测试流程-提交表单数据之后去测试页面"
                    secondary={true}/><br/>

                <FlatButton
                    onClick={this.props.user.bind(this,'yanle')}
                    label="测试mixins "
                    secondary={true}/><br/>



                {/*错误信息提示框*/}
                <Dialog
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >
                    注册的时候需要填写所有信息，登录的时候只用填写用户名和账号就可以了！
                </Dialog>
            </div>
        )
    }
}

export default Index;