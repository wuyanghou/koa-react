
import qs from 'query-string';
import request from './http';

const baseUrl='/koa'
async function httpGet(url,params={}){
  let query=qs.stringify(params);
  let res;
  try{
    res=await request(baseUrl+url+'?'+query,{method:'GET'});
    return res;
  }catch(e){
    if(e===401){
      console.log(456);
      window.location.href='http://localhost:8000/login'
    }
  }
}

async function httpPost(url,params={},dataType){
  let option={method:'POST'};
  if(dataType==='json'){
    option={
      ...option,
      body:JSON.stringify(params),
      headers:{
        "Content-Type": "application/json;charset=utf-8"
      }
    }
  }else{
    option={
      ...option,
      body:qs.stringify(params),
      headers:{
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }
  }
  let res;
  try{
    res=await request(baseUrl+url,option);
    return res;
  }catch(e){
    if(e===401){
       window.location.href='http://localhost:8000/login'
     }
  }
}


export{httpGet,httpPost};
