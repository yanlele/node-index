/**
 * create by yanle
 * connect me 331393627@qq.com
 * create time 2018-11-18 22:34
 */

function codeRender() {
    with (this) {
        return _c('div',
            {attrs: {"id": "app"}},
            [
                _c('div', [
                    _c('input', {
                        directives: [{
                            name: "model",
                            rawName: "v-model",
                            value: (title),             // 渲染 指定数据
                            expression: "title"
                        }],
                        domProps: {"value": (title)},   // 渲染 指定数据
                        on: {                       // 通过input输入事件， 修改title
                            "input": function ($event) {
                                if ($event.target.composing) return;
                                title = $event.target.value
                            }
                        }
                    }),
                    _v(" "),                // 文本节点
                    _c('br'),
                    _v(" "),
                    _c('button', {          // dom 节点
                            attrs: {"id": "btn-submit"},
                            on: {"click": add}
                        },
                        [_v("submit")])]),

                _v(" "),

                _c('div', [
                    _c('ul',
                        {attrs: {"id": "ul-list"}},
                        _l((list), function (item) {                // 数组节点
                            return _c('li', [_v(_s(item))])
                        })
                    )
                ])
            ])
    }
}