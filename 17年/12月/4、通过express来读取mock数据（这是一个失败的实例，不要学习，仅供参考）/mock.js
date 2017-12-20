const Mock = require('mockjs')
const Random = Mock.Random

const apiList = {
  api: {
    list: Mock.mock({
      'list|1-10': [{
        'id|+1': 1,
        title: Random.title(3, 5),
        time: Random.date()
      }]
    }),
    user: Mock.mock({
      name: Random.name(),
      email: Random.email(),
      address: Random.county(),
    }),
    a: {
      b: {
        'number1|1-100.1-10': 1,
        'number2|123.1-10': 1,
        'number3|123.3': 1,
        'number4|123.10': 1.123
      }
    }
  }
}
module.exports = apiList

