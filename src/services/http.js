import errors from './errors';
const defaultOptions={
  credentials:'include',
  mode:'cors'
}


async function  request (url,options){
  let res;
  try{
    res = await fetch(url, { ...defaultOptions, ...options });
    const {status}=res;
  }catch(e){
    throw '网络错误'
  }
  let {status}=res;
  if(status > 500){
    throw '系统错误';
  }else if(status === 401){
    throw 401;
  }else if(status !== 200 && status !== 400 && status !== 500){
    throw '网络错误'
  }
  return res.json();
}

export default request;
