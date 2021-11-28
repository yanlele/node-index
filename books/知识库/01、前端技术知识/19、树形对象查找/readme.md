# 树形对象查找研究

先假定有这样的数据结构
```typescript
export interface Tree {
  id: string;
  name: string;
  pid?: string;
  children?: Tree[];
}

export const tree: Tree[] = [
  {
    id: '1',
    name: '教学素材管理',
    children: [
      {
        id: '101',
        name: '教学素材',
        children: [
          {
            id: '10101',
            name: '修改',
          },
          {
            id: '10102',
            name: '添加',
          },
        ],
      },
      {
        id: '102',
        name: '测试试题',
      },
      {
        id: '103',
        name: '问题任务',
      },
    ],
  },
  {
    id: '2',
    name: '基础数据管理',
    children: [
      {
        id: '201',
        name: '专业设置',
      },
      {
        id: '202',
        name: '专业管理',
      },
    ],
  },
];
```

### 查找
#### 深度遍历
```typescript
import { tree, Tree } from './datsSource';

const deepQuery = (tree: Tree[], id: string): Tree => {
  let isGet = false;
  let retNode: Tree = null;
  const deepSearch = (tree: Tree[], id: string): void => {
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

console.time();
const node = deepQuery(tree, '10102');
console.timeEnd();
console.log(node);
```

#### 广度遍历
```typescript
import { tree, Tree } from './datsSource';

const breadthQuery = (tree: Tree[], id: string) => {
  let stark: Tree[] = [];
  stark = stark.concat(tree);
  while (stark.length) {
    const temp = stark.shift();
    if (temp.children) stark = stark.concat(temp.children);
    if (temp.id === id) return temp;
  }
};

console.time();
const node = breadthQuery(tree, '10102');
console.timeEnd();
console.log(node);
```


### 对象拍平
方法一：                    
```typescript
import { tree, Tree } from './datsSource';

const flatten01 = (data: Tree[]): Tree[] => {
  const arr: Tree[] = [];
  const spread = (tree: Tree[], pid: string) => {
    for (let index = 0; index < tree.length; index++) {
      const { id, name, children } = tree[index];
      arr.push({ id, name, pid });
      if (children) spread(children, id);
    }
  };
  spread(data, '0');
  return arr;
};

console.log(flatten01(tree));
```

方法二：                    
```typescript
import { tree, Tree } from './datsSource';

const flatten02 = (data: Tree[], pid: string): Tree[] => {
  return data.reduce((previousValue, currentValue) => {
    const { id, name, children = [] } = currentValue;
    return previousValue.concat([{ id, name, pid }], flatten02(children, id));
  }, []);
};

console.log(flatten02(tree, '0'));
```

### 数组排成树形
```typescript
import { tree, Tree } from './datsSource';

const flatten02 = (data: Tree[], pid: string): Tree[] => {
  return data.reduce((previousValue, currentValue) => {
    const { id, name, children = [] } = currentValue;
    return previousValue.concat([{ id, name, pid }], flatten02(children, id));
  }, []);
};

const arrayData = flatten02(tree, '0');
console.log(arrayData);

/**
 * 有点秀
 * @param arrayData
 */
const treeData = (arrayData: Tree[]): Tree[] => {
  return arrayData.filter(father => {
    const branchArr = arrayData.filter(child => father.id === child.pid);
    branchArr.length > 0 ? (father.children = branchArr) : '';
    return father.pid === '0';
  });
};

console.log(JSON.stringify(treeData(arrayData), undefined, 4));
```



### 参考文章
- [JS 树形结构与数组结构相互转换、在树形结构中查找对象](https://www.cnblogs.com/JerryD/p/11535589.html)
- [js查找树形结构递归方法](https://blog.csdn.net/beichen3997/article/details/100033957)
- [js查找树结构某元素，并找到其所有祖先](https://www.haorooms.com/post/js_search_tree)
- [js中树结构根据条件查找节点返回节点路径的一些思路](https://www.cnblogs.com/lycnblogs/p/6874389.html)
- [js中树结构根据条件查找节点返回节点路径的一些思路](https://www.cnblogs.com/lycnblogs/p/6874389.html)
