
import qs from 'query-string';
import request from './http';

const baseUrl='/koa'
async function httpGet(url,params={}){
  let query=qs.stringify(params);
  const res=await request(baseUrl+url+'?'+query,{method:'GET'});
  return res;
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
  const res=await request(baseUrl+url,option);
  return res;
}


export{httpGet,httpPost};
