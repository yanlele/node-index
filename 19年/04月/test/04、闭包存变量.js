const getInfo = (info) => {
  const id = info.id;
  return ()=> ({
    id
  })
};

console.log(getInfo({
  id: 122
})());
