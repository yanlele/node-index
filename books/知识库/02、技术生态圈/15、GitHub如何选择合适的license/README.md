## GitHub如何选择合适的license

各协议介绍

<table>
  <thead>
  <tr>
    <th>协议</th>
    <th>简述</th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td><a href="https://link.juejin.cn?target=https%3A%2F%2Fchoosealicense.com%2Flicenses%2Fapache-2.0%2F"
           target="_blank" title="https://choosealicense.com/licenses/apache-2.0/" ref="nofollow noopener noreferrer">Apache</a>
    </td>
    <td>允许他人修改源代码后再闭源，但是必须对每个修改过的文件做版权说明</td>
  </tr>
  <tr>
    <td><a href="https://link.juejin.cn?target=https%3A%2F%2Fchoosealicense.com%2Flicenses%2Fgpl-3.0%2F" target="_blank"
           title="https://choosealicense.com/licenses/gpl-3.0/" ref="nofollow noopener noreferrer">GPL3</a></td>
    <td>无论以何种方式修改或者使用代码，都需要开源</td>
  </tr>
  <tr>
    <td><a href="https://link.juejin.cn?target=https%3A%2F%2Fchoosealicense.com%2Flicenses%2Fmit%2F" target="_blank"
           title="https://choosealicense.com/licenses/mit/" ref="nofollow noopener noreferrer">MIT</a></td>
    <td>允许他人修改源代码后再闭源，不用对修改过的文件做说明，且二次开发的软件可以使用原作者的名字做营销</td>
  </tr>
  <tr>
    <td><a href="https://link.juejin.cn?target=https%3A%2F%2Fchoosealicense.com%2Flicenses%2Fbsd-2-clause%2F"
           target="_blank" title="https://choosealicense.com/licenses/bsd-2-clause/" ref="nofollow noopener noreferrer">BSD2</a>/<a
      href="https://link.juejin.cn?target=https%3A%2F%2Fchoosealicense.com%2Flicenses%2Fbsd-3-clause%2F" target="_blank"
      title="https://choosealicense.com/licenses/bsd-3-clause/" ref="nofollow noopener noreferrer">BSD3</a></td>
    <td>和上面一条类似，但未经事先书面许可，不得使用版权所有者的姓名或其贡献者的姓名来推广</td>
  </tr>
  <tr>
    <td><a href="https://link.juejin.cn?target=https%3A%2F%2Fchoosealicense.com%2Flicenses%2Fbsl-1.0%2F" target="_blank"
           title="https://choosealicense.com/licenses/bsl-1.0/" ref="nofollow noopener noreferrer">BSL</a></td>
    <td>和GPL类似，但不需要复制版权信息</td>
  </tr>
  <tr>
    <td><a href="https://link.juejin.cn?target=https%3A%2F%2Fchoosealicense.com%2Flicenses%2Fcc0-1.0%2F" target="_blank"
           title="https://choosealicense.com/licenses/cc0-1.0/" ref="nofollow noopener noreferrer">CCZ</a></td>
    <td>放弃创作的作品版权权益，并将其奉献给大众，不对代码做任何担保</td>
  </tr>
  <tr>
    <td><a href="https://link.juejin.cn?target=https%3A%2F%2Fopensource.org%2Flicenses%2FEPL-2.0" target="_blank"
           title="https://opensource.org/licenses/EPL-2.0" ref="nofollow noopener noreferrer">EPL</a></td>
    <td>与GPL类似，有权使用、修改、复制与发布软件原始版本和修改后版本，但在某些情况下则必须将修改内容一并释出</td>
  </tr>
  <tr>
    <td><a href="https://link.juejin.cn?target=https%3A%2F%2Fchoosealicense.com%2Flicenses%2Fagpl-3.0%2F"
           target="_blank" title="https://choosealicense.com/licenses/agpl-3.0/"
           ref="nofollow noopener noreferrer">AGPL</a></td>
    <td>GPL拓展，使用在线网络服务的也需要开源</td>
  </tr>
  <tr>
    <td><a href="https://link.juejin.cn?target=https%3A%2F%2Fchoosealicense.com%2Flicenses%2Fgpl-2.0%2F" target="_blank"
           title="https://choosealicense.com/licenses/gpl-2.0/" ref="nofollow noopener noreferrer">GPL2</a></td>
    <td>和GPL3相比，如果使用代码作为服务提供，而不分发软件，则不需要开源</td>
  </tr>
  <tr>
    <td><a href="https://link.juejin.cn?target=https%3A%2F%2Fchoosealicense.com%2Flicenses%2Flgpl-3.0%2F"
           target="_blank" title="https://choosealicense.com/licenses/lgpl-3.0/"
           ref="nofollow noopener noreferrer">LGPL</a></td>
    <td>和GPL相比，LGPL允许商业软件通过类库引用(link)方式使用LGPL类库而不需要开源商业软件的代码</td>
  </tr>
  <tr>
    <td><a href="https://link.juejin.cn?target=https%3A%2F%2Fchoosealicense.com%2Flicenses%2Fmpl-2.0%2F" target="_blank"
           title="https://choosealicense.com/licenses/mpl-2.0/" ref="nofollow noopener noreferrer">Mozilla</a></td>
    <td>与LGPL类似，但是需要对修改过的源码内容做说明</td>
  </tr>
  <tr>
    <td><a href="https://link.juejin.cn?target=https%3A%2F%2Fchoosealicense.com%2Flicenses%2Funlicense%2F"
           target="_blank" title="https://choosealicense.com/licenses/unlicense/" ref="nofollow noopener noreferrer">Unlicense</a>
    </td>
    <td>与CCZ相似，且开放商标和所用的专利授权</td>
  </tr>
  </tbody>
</table>



### 总结
MIT可以说是很宽松的一个协议了，它允许对代码做任何形式的修改和宣传
GPL鼓励免费，著名的Linux使用的就是这个协议，这使得它成为时下热门的一个协议               
BSD不允许不经书面许可借原作者进行推广，如果介意其他人的项目推广自己的话可以选择这个协议                   

### 参考文档

https://juejin.cn/post/7077726505333161991
