import React from 'react';
import PropTypes from 'prop-types';
import DefaultPropsImg from 'ASSETS/defaultProps.jpg';
import DefaultPropsImg2 from 'ASSETS/defaultProps2.jpg';
export default class DefaultProps extends React.PureComponent{
  constructor(props){
    super(props);
  }
  static defaultProps={
    city:'广州',
    year:2016

  }
  static propTypes={
    city:PropTypes.string.isRequired,
    year:PropTypes.number.isRequired
  }
  render(){
     return(
       <div>
          <h1>我现在在&nbsp;&nbsp;{this.props.city},&nbsp;&nbsp;{this.props.year} &nbsp;&nbsp;来的</h1>
         <i style={{fontSize:20,marginTop:40,display:'block'}}>tips:设置默认props参数与参数类型目前有两种做法（推荐第一种）：</i>
         <i style={{fontSize:20,marginTop:40,display:'block'}}>第一种，需要引入'prop-types'包</i>
         <img src={DefaultPropsImg} alt=""/>
         <i style={{fontSize:20,marginTop:40,display:'block'}}>第二种</i>
         <img src={DefaultPropsImg2} alt=""/>
       </div>
     )
  }
}
//
// DefaultProps.defaultProps={
//   city:'广州',
//   year:2016
// }
// DefaultProps.propTypes={
//   city:PropTypes.string.isRequired,
//   year:PropTypes.number.isRequired
// }

