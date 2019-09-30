class SetTimeout {

  static mainFunction() {
    console.log(`<${'='.repeat(50)}time${'='.repeat(50)}>`);
    this.timer = setTimeout(() => {
      this.mainFunction()
    }, 1000)
  };

  static clear() {
    clearTimeout(this.timer)
  }
}


SetTimeout.mainFunction();

setTimeout(()=> {
  SetTimeout.clear();
}, 10000);

