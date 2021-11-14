/**
 * create by yanle
 * create time 2020-03-25 23:20
 */

/**
 * create by yanle
 * create time 2020-03-23 22:53
 */
const tree = [
  {
    'id': '1',
    'name': '教学素材管理',
    'children': [
      {
        'id': '101',
        'name': '教学素材',
        'children': [
          {
            'id': '10101',
            'name': '修改',
          },
          {
            'id': '10102',
            'name': '添加',
          }
        ]
      }, {
        'id': '102',
        'name': '测试试题',
      },
      {
        'id': '103',
        'name': '问题任务',
      }
    ]
  }, {
    'id': '2',
    'name': '基础数据管理',
    'children': [
      {
        'id': '201',
        'name': '专业设置',
      },
      {
        'id': '202',
        'name': '专业管理',
      }
    ]
  }
];


module.exports.tree = tree;
