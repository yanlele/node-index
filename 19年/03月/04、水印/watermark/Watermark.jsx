import React from 'react';
import styled from 'styled-components';
import './index.less';

const watermark = (props) => {
  // 默认设置
  const defaultSettings = {
    watermarkTxt: 'text',
    watermarkX: 100, // 水印起始位置x轴坐标
    watermarkY: 20, // 水印起始位置Y轴坐标
    watermarkRows: 20, // 水印行数
    watermarkCols: 20, // 水印列数
    watermarkXSpace: 200, // 水印x轴间隔
    watermarkYSpace: 100, // 水印y轴间隔
    watermarkColor: '#000000', // 水印字体颜色
    watermarkAlpha: 0.1, // 水印透明度
    watermarkFontSize: '18px', // 水印字体大小
    watermarkFont: '微软雅黑', // 水印字体
    watermarkWidth: 120, // 水印宽度
    watermarkHeight: 80, // 水印长度
    watermarkAngle: 15, // 水印倾斜度数
  };

  Object.assign(defaultSettings, props);

  // 获取页面最大宽度
  const page_width = Math.max(
    document.body.scrollWidth,
    document.body.clientWidth,
  );
  // 获取页面最大长度
  const page_height = Math.max(
    document.body.scrollHeight,
    document.body.clientHeight,
  );

  // 如果将水印列数设置为0，或水印列数设置过大，超过页面最大宽度，则重新计算水印列数和水印x轴间隔
  if (
    defaultSettings.watermarkCols === 0 ||
    parseInt(defaultSettings.watermarkX +
      (defaultSettings.watermarkWidth * defaultSettings.watermarkCols) +
      (defaultSettings.watermarkXSpace * (defaultSettings.watermarkCols - 1)), 10) > page_width
  ) {
    defaultSettings.watermarkCols = parseInt(((page_width - defaultSettings.watermarkX) +
      defaultSettings.watermarkXSpace) /
      (defaultSettings.watermarkWidth + defaultSettings.watermarkXSpace), 10);
    defaultSettings.watermarkXSpace = parseInt((page_width -
      defaultSettings.watermarkX -
      (defaultSettings.watermarkWidth * defaultSettings.watermarkCols)) /
      (defaultSettings.watermarkCols - 1), 10);
  }
  // 如果将水印行数设置为0，或水印行数设置过大，超过页面最大长度，则重新计算水印行数和水印y轴间隔
  if (
    defaultSettings.watermarkRows === 0 ||
    parseInt(defaultSettings.watermarkY +
      (defaultSettings.watermarkHeight * defaultSettings.watermarkRows) +
      (defaultSettings.watermarkYSpace * (defaultSettings.watermarkRows - 1)), 10) > page_height
  ) {
    defaultSettings.watermarkRows = parseInt((defaultSettings.watermarkYSpace +
      (page_height - defaultSettings.watermarkY)) /
      (defaultSettings.watermarkHeight + defaultSettings.watermarkYSpace), 10);
    defaultSettings.watermarkYSpace = parseInt((page_height -
      defaultSettings.watermarkY -
      (defaultSettings.watermarkHeight * defaultSettings.watermarkRows)) /
      (defaultSettings.watermarkRows - 1), 10);
  }

  let x;
  let y;
  const maskDivs = [];
  for (let i = 0; i < defaultSettings.watermarkRows; i += 1) {
    y =
      defaultSettings.watermarkY +
      ((defaultSettings.watermarkYSpace + defaultSettings.watermarkHeight) * i);
    for (let j = 0; j < defaultSettings.watermarkCols; j += 1) {
      x =
        defaultSettings.watermarkX +
        ((defaultSettings.watermarkWidth + defaultSettings.watermarkXSpace) * j);

      const MasKDiv = styled.div`
          -webkit-transform: rotate(-${defaultSettings.watermarkAngle}deg);
          -moz-transform: rotate(-${defaultSettings.watermarkAngle}deg);
          -ms-transform: rotate(-${defaultSettings.watermarkAngle}deg);
          -o-transform: rotate(-${defaultSettings.watermarkAngle}deg);
          transform: rotate(-${defaultSettings.watermarkAngle}deg);      
          left: ${x}px;
          top: ${y}px;
          opacity: ${defaultSettings.watermarkAlpha};
          font-size: ${defaultSettings.watermarkFontSize};
          font-family: ${defaultSettings.watermarkFont};
          color: ${defaultSettings.watermarkColor};
          width: ${defaultSettings.watermarkWidth}px;
          height: ${defaultSettings.watermarkHeight}px;
        `;

      maskDivs.push((
        <MasKDiv
          key={`maskDiv-${i}-${j}`}
          id={`maskDiv-${i}-${j}`}
          data-name={defaultSettings.watermarkTxt}
          className="watermark_background"
        />
      ));
    }
  }

  return (
    <div>
      {maskDivs.map(item => item)}
    </div>
  );
};

export default watermark;
