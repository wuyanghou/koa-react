import React from 'react';
import httpGet from 'SERVICE/index';
export default class Home extends React.PureComponent{
  constructor(props){
    super(props);
  }
  async componentDidMount(){
    let res=await httpGet('/login',{name:'luoming',password:'222'});
    console.log(res);
  }
  render(){
    return (
      <div>
        <img src="" alt=""/>
        <h1>这是一个本人练手的项目，用来熟悉react及其他的知识点，其中包括但并不限于defaultProps，context，mobx，mobx-react，
          mirror，PureComponent,webworker，装饰器函数==后续补充
        </h1>
      </div>
    )
  }
}
