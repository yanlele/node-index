import './index.less';
/* eslint-disable */
const index = settings => {
    //默认设置
    const defaultSettings = {
        watermarkTxt: 'text',
        watermarkX: 100,//水印起始位置x轴坐标
        watermarkY: 20,//水印起始位置Y轴坐标
        watermarkRows: 20,//水印行数
        watermarkCols: 20,//水印列数
        watermarkXSpace: 200,//水印x轴间隔
        watermarkYSpace: 100,//水印y轴间隔
        watermarkColor: '#000000',//水印字体颜色
        watermarkAlpha: 0.1,//水印透明度
        watermarkFontSize: '18px',//水印字体大小
        watermarkFont: '微软雅黑',//水印字体
        watermarkWidth: 120,//水印宽度
        watermarkHeight: 80,//水印长度
        watermarkAngle: 15,//水印倾斜度数
    };
    Object.assign(defaultSettings, settings);

    const oTemp = document.createDocumentFragment();

    //获取页面最大宽度
    const page_width = Math.max(document.body.scrollWidth, document.body.clientWidth);
    //获取页面最大长度
    const page_height = Math.max(document.body.scrollHeight, document.body.clientHeight);

    //如果将水印列数设置为0，或水印列数设置过大，超过页面最大宽度，则重新计算水印列数和水印x轴间隔
    if (defaultSettings.watermarkCols === 0 ||
        (parseInt(defaultSettings.watermarkX
            + defaultSettings.watermarkWidth * defaultSettings.watermarkCols
            + defaultSettings.watermarkXSpace * (defaultSettings.watermarkCols - 1))
            > page_width)) {
        defaultSettings.watermarkCols =
            parseInt((page_width
                - defaultSettings.watermarkX
                + defaultSettings.watermarkXSpace)
                / (defaultSettings.watermarkWidth
                    + defaultSettings.watermarkXSpace));
        defaultSettings.watermarkXSpace =
            parseInt((page_width
                - defaultSettings.watermarkX
                - defaultSettings.watermarkWidth
                * defaultSettings.watermarkCols)
                / (defaultSettings.watermarkCols - 1));
    }
    //如果将水印行数设置为0，或水印行数设置过大，超过页面最大长度，则重新计算水印行数和水印y轴间隔
    if (defaultSettings.watermarkRows === 0 ||
        (parseInt(defaultSettings.watermarkY
            + defaultSettings.watermarkHeight * defaultSettings.watermarkRows
            + defaultSettings.watermarkYSpace * (defaultSettings.watermarkRows - 1))
            > page_height)) {
        defaultSettings.watermarkRows =
            parseInt((defaultSettings.watermarkYSpace
                + page_height - defaultSettings.watermarkY)
                / (defaultSettings.watermarkHeight + defaultSettings.watermarkYSpace));
        defaultSettings.watermarkYSpace =
            parseInt((page_height
                - defaultSettings.watermarkY
                - defaultSettings.watermarkHeight
                * defaultSettings.watermarkRows)
                / (defaultSettings.watermarkRows - 1));
    }
    let x;
    let y;
    for (let i = 0; i < defaultSettings.watermarkRows; i++) {
        y = defaultSettings.watermarkY + (defaultSettings.watermarkYSpace + defaultSettings.watermarkHeight) * i;
        for (let j = 0; j < defaultSettings.watermarkCols; j++) {
            x = defaultSettings.watermarkX + (defaultSettings.watermarkWidth + defaultSettings.watermarkXSpace) * j;

            const maskDiv = document.createElement('div');
            maskDiv.className = 'watermark_background';
            maskDiv.id = 'maskDiv' + i + j;
            // maskDiv.appendChild(document.createTextNode(defaultSettings.watermarkTxt));
            maskDiv.setAttribute('data-name', defaultSettings.watermarkTxt);
            //设置水印div倾斜显示
            maskDiv.style.webkitTransform = 'rotate(-' + defaultSettings.watermarkAngle + 'deg)';
            maskDiv.style.MozTransform = 'rotate(-' + defaultSettings.watermarkAngle + 'deg)';
            maskDiv.style.msTransform = 'rotate(-' + defaultSettings.watermarkAngle + 'deg)';
            maskDiv.style.OTransform = 'rotate(-' + defaultSettings.watermarkAngle + 'deg)';
            maskDiv.style.transform = 'rotate(-' + defaultSettings.watermarkAngle + 'deg)';
            maskDiv.style.visibility = '';
            maskDiv.style.left = x + 'px';
            maskDiv.style.top = y + 'px';
            //maskDiv.style.border="solid #eee 1px";
            maskDiv.style.opacity = defaultSettings.watermarkAlpha;
            maskDiv.style.fontSize = defaultSettings.watermarkFontSize;
            maskDiv.style.fontFamily = defaultSettings.watermarkFont;
            maskDiv.style.color = defaultSettings.watermarkColor;
            maskDiv.style.width = defaultSettings.watermarkWidth + 'px';
            maskDiv.style.height = defaultSettings.watermarkHeight + 'px';
            oTemp.appendChild(maskDiv);
        }
    }
    document.body.appendChild(oTemp);
};

export default index;
