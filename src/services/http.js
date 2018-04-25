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
    return res.json();
  }catch(e){
    throw errors.netError
  }
}

export default request;
