import React, {Component} from 'react'

export default (WrappedComponent) => {
    class NewComponent extends Component {

        constructor(props){
            super(props);
            this.state={
                name:'mixins'
            }
        }

        componentDidMount(){
            console.log('mixnis test');
        }

        test(message){
            console.log(message)
        }

        render() {
            const newProps = {
                user: this.test
            };

            return <WrappedComponent {...newProps}/>
        }
    }

    return NewComponent
}