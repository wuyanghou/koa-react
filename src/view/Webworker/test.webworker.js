self.addEventListener('message', (e) => {
  console.log(e.data);
  setTimeout(()=>{
    self.postMessage('3s后发来信息');
    //终止线程
    self.close();
  },3000)

});
