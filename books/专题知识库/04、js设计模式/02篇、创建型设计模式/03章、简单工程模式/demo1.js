//篮球基类
class BasketBall {
  constructor() {
    this.intro = '篮球盛行于美国'
  }

  getMember() {
    console.log('每一个队伍需要五个球员');
  }

  getBallSize() {
    console.log('篮球很大')
  }
}

// 足球基类
class FootBall {
  constructor() {
    this.intro = '足球在全世界范围都很流行'
  }

  getMember() {
    console.log('每一个队伍需要11个球员');
  }

  getBallSize() {
    console.log('足球很大')
  }
}

let SportsFactory = function (name) {
  switch (name) {
    case 'NBA':
      return new BasketBall();
    case 'wordCup':
      return new FootBall();
  }
};

// 为直接被创建一个足球，只需要记住工厂，并且调用就可以了
let footBall = SportsFactory('wordCup');
console.log(footBall);
console.log(footBall.intro);
footBall.getMember();
