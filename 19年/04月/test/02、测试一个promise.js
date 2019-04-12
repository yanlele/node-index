const mp = () => {
  return new Promise((resolve, reject) => {
    if (1 === 2) {
      resolve('success')
    } else {
      reject('error')
    }
  })
};

mp()
    .catch((res) => {
      console.log(res);
      return 'err';
    })
    .then((res) => {
      console.log(res);
    });
