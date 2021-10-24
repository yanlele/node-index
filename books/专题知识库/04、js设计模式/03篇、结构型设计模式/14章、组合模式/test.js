let {Container, Item, NewsGroup} = require('./02、组合要有容器类');
let {ImageNews, IconNews, EasyNews, TypeNews} = require('./03、新闻成员类');

let news1 = new Container('news', document.body);
news1.add(
    new Item('normal').add(
        new IconNews('梅西不拿金球奖也伟大', '#', 'video')
    )
).add(
    new Item('normal').add(
        new IconNews('bilibili11111', '#', 'live')
    )
).add(
    new Item('normal').add(
        new NewsGroup('has-img').add(
            new ImageNews('img/a.jpg', '#', 'small')
        ).add(
            new EasyNews('123123123121', '#')
        ).add(
            new EasyNews('222222222222', '#')
        )
    )
).add(
    new Item('normal').add(
        new TypeNews('3333333333', '#', 'NBA', 'left')
    )
).add(
    new Item('normal').add(
        new TypeNews('444444444', '#', 'NBA', 'right')
    )
).show();