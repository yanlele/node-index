import React, { FC } from 'react';
import Parent from './Parent';
import Child from './Child';
import ParentChildren from './ParentChildren';

const PropsChild: FC = () => {
  return (
    <div>
      <h2>PropsChild</h2>
      <hr />
      <h3>单个child 场景</h3>
      <Parent>
        <Child />
      </Parent>

      <hr />
      <h3>多个childRen场景</h3>
      <ParentChildren>
        <Child name="first child" />
        <Child />
        <Child />
      </ParentChildren>
    </div>
  );
};

export default PropsChild;
