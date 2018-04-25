onmessage = function(message){
  let data=message.data;
  data.msg = 'Hi from task.js';
  postMessage(data);
}
