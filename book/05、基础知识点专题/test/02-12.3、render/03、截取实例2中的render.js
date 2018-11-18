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
                            value: (title),
                            expression: "title"
                        }],
                        domProps: {"value": (title)},
                        on: {
                            "input": function ($event) {
                                if ($event.target.composing) return;
                                title = $event.target.value
                            }
                        }
                    }),
                    _v(" "),
                    _c('br'),
                    _v(" "),
                    _c('button', {
                            attrs: {"id": "btn-submit"},
                            on: {"click": add}
                        },
                        [_v("submit")])]),

                _v(" "),

                _c('div', [
                    _c('ul',
                        {attrs: {"id": "ul-list"}},
                        _l((list), function (item) {
                            return _c('li', [_v(_s(item))])
                        }))])
            ])
    }
}