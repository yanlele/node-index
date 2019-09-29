import React, { FC, Children as RChildren, cloneElement, ReactElement } from 'react';
import { get } from 'lodash';

const ParentChildren: FC = props => {
  return (
    <>
      {RChildren.map(props.children, (child, index) => {
        console.log('child.props inject', get(child, 'props'));
        return cloneElement(child as ReactElement, {
          index,
        });
      })}
    </>
  );
};

export default ParentChildren;
