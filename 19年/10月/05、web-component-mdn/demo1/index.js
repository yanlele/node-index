/**
 * create by yanle
 * create time 2019-10-29 23:38
 */

class PopUpInfo extends HTMLElement {
  constructor() {
    super();

    // 创建一个 shadow root
    const shadow = this.attachShadow({mode: 'open'});

    // 创建一个span
    const wrapper = document.createElement('span');
    wrapper.setAttribute('class', 'wrapper');

    const icon = document.createElement('span');
    icon.setAttribute('class', 'icon');
    icon.setAttribute('tabindex', '0');

    const info = document.createElement('span');
    info.setAttribute('class', info);

    // 获取 text 属性上面的内容， 添加到一个 span 标签内
    info.textContent = this.getAttribute('text');

    // 插入icon
    let imageUrl;
    if (this.hasAttribute('img')) {
      imageUrl = this.getAttribute('img')
    } else {
      imageUrl = 'img/default.png'
    }

    const img = document.createElement('img');
    img.src = imageUrl;
    icon.appendChild(img);

    // 创建css
    const style = document.createElement('style');

    style.textContent = ''; // 省略了

    shadow.appendChild(style);
    shadow.appendChild(wrapper);
    shadow.appendChild(icon);
    shadow.appendChild(info);
  }
}

window.customElements.define('popup-info', PopUpInfo);
