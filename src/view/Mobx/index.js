import React from 'react';
import {observer, inject} from "mobx-react";
import {Button} from 'antd';
@inject((stores) => {
  return {
    name:stores.mainStore.name,
    age:stores.mainStore.age,
    length:stores.mainStore.length,
    increment:stores.mainStore.increment,
  }
})
@observer
export default class Mobx extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>mobx是比较常用的数据管理方式，学习连接 <a href="http://cn.mobx.js.org/" target='_blank'>mobx</a> </h1>
        <div style={{fontSize:16}}>
          其中 mobx-react 提供了 Provider,inject,observer来与react结合使用，使得Component组件能够实时响应数据改变
        </div>
        <div style={{marginTop:40,fontSize:20}}>
           <div>
             <span>名称</span><span>{this.props.name}</span>
           </div>
          <div>
            <span>年龄</span><span>{this.props.age}</span>
          </div>
          <div>
            <span>长度</span><span>{this.props.length}</span>
          </div>
          <Button onClick={e=>this.props.increment()}>点击改变mobx中数据</Button>
        </div>
      </div>
    )
  }
}
