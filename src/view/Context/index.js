import React from 'react';
import PropTypes from 'prop-types';
import ContextChild from './ContextChild/index';
export default class Context extends React.PureComponent{
  constructor(props){
    super(props);
    this.state={
      ff:true
    }
  }
  getChildContext = () => {
    return {
      ff: this.state.ff,
      change:()=> {
        this.setState({ff:!this.state.ff});
      }
    };
  }
  render(){
    return (
      <div>
        <h1>Context Api 是react官方提供的方法，以前的版本提示是个不稳定的Api，可能会在未来的版本中移除，但是redux及flux等内部都是使用
        了这个Api，很奇怪。最近的版本中，react官方又声明可以使用这个Api，所以我们来看看</h1>
        <ContextChild/>
      </div>
    )
  }
}

Context.childContextTypes = {
  ff: PropTypes.bool,
  change: PropTypes.func
};
