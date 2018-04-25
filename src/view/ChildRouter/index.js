import React from 'react';
import {Router, Route,NavLink} from 'mirrorx';
import {Button} from 'antd';
import asyncComponent from '../../asyncComponent';
const childrenF=asyncComponent(()=>import('./ChildrenF'));
const childrenT=asyncComponent(()=>import('./ChildrenT'));
export default class Parent extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    console.log(this.props);
    const {path}=this.props.match;
    return (
      <div>
        <h1>熟悉react-router4 zi路由怎么使用</h1>
        <NavLink to={`${path}/childrenF`}>子路由一</NavLink>
        <NavLink to={`${path}/childrenT`}>子路由二</NavLink>
        <Router>
          <div>
            <Route path={`${path}/childrenF`} component={childrenF}/>
            <Route path={`${path}/childrenT`} component={childrenT}/>
          </div>
        </Router>
      </div>
    )
  }
}
