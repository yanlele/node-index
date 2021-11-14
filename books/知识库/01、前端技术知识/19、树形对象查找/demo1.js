/**
 * create by yanle
 * create time 2020-03-23 22:53
 */

const {tree} = require('./data');

/* 深度遍历思想 */
const deepQuery = (tree, id) => {
  let isGet = false;
  let retNode = null;
  const deepSearch = (tree, id) => {
    for (let index = 0; index < tree.length; index++) {
      if (tree[index].children && tree[index].children.length > 0) {
        deepSearch(tree[index].children, id);
      }
      if (id === tree[index].id || isGet) {
        if (!isGet) retNode = tree[index];
        isGet = true;
        break;
      }
    }
  };
  deepSearch(tree, id);
  return retNode;
};

const getNode = deepQuery(tree, '10102');
console.log(getNode);
