import React from 'react';
import {message,Spin,Icon} from 'antd';
import {httpGet, httpPost} from 'SERVICE/index';
import styles from './index.less';

export default class Oss extends React.Component {
  state = {
    fileList:[],
    loading:false
  };
  componentDidMount(){
    this.loadData();
  }
  loadData =async ()=>{
    this.setState({loading:true});
    let {code,resultMessage,data}=await httpGet('/fileList');
    this.setState({loading:false});
    if(code !== 0){
      message.error(resultMessage);
    }else{
      this.setState({fileList:[...data]});
    }
  }
  uploadFile = async (e) => {
    this.setState({loading:true});
    const file = e.target.files[0];
    let {code, resultMessage, result} = await httpGet('/getOssKey');
    if (code !== 0) {
      message.error('获取签名失败', 1);
    } else {
      let fmt = new FormData();
      for (let key in result) {
        fmt.append(key, result[key]);
      }
      fmt.append('file', file);
      fetch(result.host, {method: "POST", body: fmt, mode: 'cors'}).then(async(res)=>{
        this.setState({loading:false});
        let url=result.host+'/'+result.key;
        console.log(url);
        let {code} = await httpPost('/saveFile',{url});
        if(code===0){
          this.loadData();
        }
      });
    }
  }

  render() {
    const {fileList,loading} = this.state;
    return (
      <Spin spinning={loading} style={{display:'fixed',width:'100%',height:'100%'}}>
        {
          fileList.map((v,k)=>{
            return (
              <div key={k} className={styles.imgWrap}>
                <img src={v.url} alt=""/>
              </div>
            )
          })
        }
        <label htmlFor="upload" className={styles.imgWrap}>
          <Icon type="plus"/>
          <input type="file" onChange={this.uploadFile} id={'upload'} name={'upload'} accept="image/*" />
        </label>
      </Spin>
    )
  }
}
