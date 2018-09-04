let spans = document.getElementsByTagName('span');

// 为用户明绑定特效
spans[0].onmouseover = function() {
    this.style.color = 'red';
    this.style.backgroundColor = '#ddd'
};
spans[0].onmouseout = function () {
    this.style.color = '#333';
    this.style.backgroundColor = '#f5f5f5'
};

// 绑定等级特效
spans[1].onmouseover = function () {
    this.getElementsByTagName('strong')[0].style.color = 'red';
    this.getElementsByTagName('strong')[0].style.backgroundColor = '#ddd';
};
spans[1].onmouseout = function () {
    this.getElementsByTagName('strong')[0].style.color = '#333';
    this.getElementsByTagName('strong')[0].style.backgroundColor = '#f5f5f5';
};