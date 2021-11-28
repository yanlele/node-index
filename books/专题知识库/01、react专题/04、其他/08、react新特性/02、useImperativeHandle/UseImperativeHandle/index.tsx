import React, { FC, forwardRef, useEffect, useRef } from 'react';
import Child, { ChildRef } from './Child';

const ChildRefComponent = forwardRef(Child);

const UseImperativeHandle: FC = () => {
  const childRef = useRef<ChildRef>(null);

  useEffect(() => {
    console.log(`<${'='.repeat(50)}${'='.repeat(50)}>`);
    console.log(childRef.current);
    console.log(`<${'='.repeat(50)}${'='.repeat(50)}>`);
  }, []);

  return (
    <>
      <ChildRefComponent ref={childRef} parent="name" />
    </>
  );
};

export default UseImperativeHandle;
