import React, {Component} from 'react';
let data = [
    {
        menuId: 1,
        name: '员工管理',
        children: [
            {
                menuId: 3,
                name: '添加员工',
                children: []
            },
            {
                menuId: 4,
                name: '删除员工',
                children: [
                    {
                        menuId: 6,
                        name: '按姓名删除',
                        children: []
                    },
                    {
                        menuId: 7,
                        name: '按工号删除',
                        children: []
                    }
                ]
            }
        ],
    },
    {
        menuId: 2,
        name: '工资管理',
        children: [
            {
                menuId: 5,
                name: '修改工资',
                children: []
            }
        ],
    },
];
class App extends Component {
    render() {
        return (
            <div className="App">
                {this.generateMenu(data)}
            </div>
        );
    }

    generateMenu(menuObj) {
        let vdom = [];

        if (menuObj instanceof Array) {
            let list = [];
            for (let item of menuObj) {
                list.push(this.generateMenu(item));
            }
            vdom.push(
                <ul key="single">
                    {list}
                </ul>
            );
        } else {
            vdom.push(
                <li key={menuObj.menuId}>
                    <h1 onClick={this.onMenuClicked}>
                        {menuObj.name}
                    </h1>
                    {this.generateMenu(menuObj.children)}
                </li>
            );
        }
        return vdom;
    }
}

export default App;


