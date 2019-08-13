const myFunc = new Promise((resolve, reject) => {
  try {
    const a = 1;
    const b = 2;

    if (a + b === 4) {
      return resolve(a + b)
    } else {
      return reject('false')
    }
    throw new Error('错误了');

  } catch (e) {
    console.log('error message', e.message);
    resolve(e.message)
  }
});

const result = myFunc;
result.then((res)=> {
  console.log(res);
}).catch(()=> {
  console.log('promise cache error');
});


const resultFunction = async() => myFunc;
const run = async () => {
  const result = await resultFunction();
  console.log(`<${'='.repeat(50)}${'='.repeat(50)}>`);
  console.log(result);
  console.log(`<${'='.repeat(50)}${'='.repeat(50)}>`);
};

run();
