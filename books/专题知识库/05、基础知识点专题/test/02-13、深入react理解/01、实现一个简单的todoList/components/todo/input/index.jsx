
import React, {Component} from 'react';

class Input extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: ''
        }
    }

    render() {
        return (
            <div>
                <input value={this.state.title} onChange={(e) =>this.handleChange(e)}/>
                <button onClick={this.handleClick.bind(this)}>submit</button>
            </div>
        )
    }

    handleChange(e) {
        this.setState({
            title: e.target.value
        })
    }

    handleClick() {
        const title = this.state.title;
        console.log(title);
        // 添加进title
        const addTitle = this.props.addTitle;
        addTitle(title);

        this.setState({
            title: ''
        })
    }
}


export default Input;