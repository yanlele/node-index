
const functionThis = () => ()=> {
  console.log(`<${'='.repeat(50)}${'='.repeat(50)}>`);
  console.log(1);
  console.log(`<${'='.repeat(50)}${'='.repeat(50)}>`);
};

const functionFactory = functionThis();

console.log(functionFactory === functionFactory);
