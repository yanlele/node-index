import React, { FC } from 'react';

interface Props {
  name?: string;
  index?: number;
}

const Child: FC<Props> = props => {
  console.log('child.props output', props);

  return <div>我是children 组件</div>;
};

export default Child;
