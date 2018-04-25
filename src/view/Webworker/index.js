import React from 'react';
import Worker from './test.webworker.js';
import WebworkerImg from 'ASSETS/webworker.jpg';
import StopWebworkerImg from 'ASSETS/stopWebworker.jpg';
export default class WebWorker extends React.PureComponent{
  constructor(props){
    super(props);
    this.state={}
  }
  componentDidMount(){
    const worker = new Worker();
    worker.postMessage('向web worker线程发出信息');
    worker.onmessage = (event)=> {
      this.setState({news:event.data});
    };
  }
  render(){
    return (
      <div>
        <div style={{fontSize:16}}>
          当我们开始学习 javascript 的时候，我们就知道 js 其实是单线程的，所以当我们在浏览器中运行某些耗时算法或者阻塞线程的代码时，浏览器就会出现卡顿的现象
          然而浏览器的单个页面却拥有多个线程，比如渲染界面线程、浏览器事件触发线程、http 请求线程、事件轮询处理线程等
          如果我们能够将一部分代码放在一个新的线程中执行，比如 http 请求的方法、需要大量计算耗时较多的方法，既能够保证页面对用户及时响应，又不会阻塞页面
        </div>
        <h1>{this.state.news}</h1>


        <i style={{fontSize:16}}>
          在webpack中使用web worker 的方法，需要下载"worker-loader"依赖，然后在config.js中配置
          <br/>
          <img src={WebworkerImg} alt=""/>
          <br/>
          在普通页面中引入 let worker = new Worker ('worker.js')
          <br/>
          然后在主线程new 实例 向web worker 线程发送信息，在web worker 线程完成事件后，再向主线程发回信息，
        </i>


        <h1>终止web worker线程</h1>
        <img src={StopWebworkerImg} alt=""/>
        <i style={{fontSize:16}}>

        </i>
      </div>
    )
  }
}
