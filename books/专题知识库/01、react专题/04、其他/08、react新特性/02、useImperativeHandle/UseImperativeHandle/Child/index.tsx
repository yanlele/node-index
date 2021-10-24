import React, { RefForwardingComponent, useImperativeHandle } from 'react';

interface Props {
  parent: string;
}

export interface ChildRef {
  name: string;
  age: number;
}

const Child: RefForwardingComponent<ChildRef, Props> = (props, ref) => {
  console.log(props);

  useImperativeHandle(ref, () => ({
    name: 'yanle',
    age: 27,
  }));

  return <div>my child component</div>;
};

export default Child;
