import React from 'react';
import PropTypes from 'prop-types';
import {Button} from 'antd';
export default class ContextChild extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return (
      <div>
        <div style={{fontSize:20,fontWeight:'bold'}}>{''+this.context.ff}</div>
        <Button onClick={e=>this.context.change()}>点击改变父组件中的context值</Button>
      </div>
      )
  }
}
ContextChild.contextTypes={
  ff: PropTypes.bool,
  change:PropTypes.func
}
