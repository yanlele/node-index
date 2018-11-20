import React, {Component} from 'react';

import List from './list';
import Input from './input';

class Todo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: []
        };

        this.addTitle = this.addTitle.bind(this);
    }

    render() {
        return (
            <div>
                <Input addTitle={this.addTitle}/>
                <List data={this.state.list}/>
            </div>
        )
    }

    addTitle(title) {
        console.log(title);
        const currentList = this.state.list;
        if (title) {
            this.setState({
                list: currentList.concat([title])
            })
        }

    }
}


export default Todo;