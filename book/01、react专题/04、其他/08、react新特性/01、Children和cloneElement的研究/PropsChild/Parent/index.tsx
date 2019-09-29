import React, { FC, ReactElement, cloneElement } from 'react';

const Parent: FC = props => {
  return (
    <>
      <h3>我是parent 组件</h3>
      {props.children &&
        cloneElement(props.children as ReactElement, {
          hello: '我是单个parent示例',
        })}
    </>
  );
};

export default Parent;
