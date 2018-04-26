import React from 'react';
import {Router, Route,NavLink} from 'mirrorx'
import {Menu, Icon} from 'antd';
import asyncComponent from '../../asyncComponent'

const MenuItem = Menu.Item;


const DefaultProps=asyncComponent(()=>import('../../view/DefaultProps'));
const Mobx=asyncComponent(()=>import('../../view/Mobx'));
const Context=asyncComponent(()=>import('../../view/Context'));
const Webworker=asyncComponent(()=>import('../../view/Webworker'));
const ChildRouter=asyncComponent(()=>import('../../view/ChildRouter'));
const Home=asyncComponent(()=>import('../../view/Home'));

class Wrap extends React.Component{
  state={};
  componentWillMount(){
   let {history}=this.props;
    history.push('/home');
  }
  render(){
    return (
      <div>
        <Menu
          mode="horizontal"
          theme="dark"
          selectedKeys={[location.pathname]}
        >
          <MenuItem key="/home">
            <NavLink to="/home"><Icon type="home" />Home</NavLink>
          </MenuItem>
          <MenuItem key="/defaultProps">
            <NavLink to="/defaultProps"><Icon type="bars" />DefaultProps</NavLink>
          </MenuItem>
          <MenuItem key="/mobx">
            <NavLink to="/mobx"><Icon type="frown-circle" />mobx</NavLink>
          </MenuItem>
          <MenuItem key="/context">
            <NavLink to="/context"><Icon type="frown-circle" />context</NavLink>
          </MenuItem>
          <MenuItem key="/webworker">
            <NavLink to="/webworker"><Icon type="frown-circle" />webworker</NavLink>
          </MenuItem>
          <MenuItem key="/childrouter">
            <NavLink to="/childrouter"><Icon type="frown-circle" />childrouter</NavLink>
          </MenuItem>
          <MenuItem key="/mirror">
            <a target="_blank" href="https://github.com/mirrorjs/mirror">Mirror</a>
          </MenuItem>
        </Menu>
          <div>
            <Route path="/home" component={Home} />
            <Route path="/defaultProps" component={DefaultProps} />
            <Route path="/mobx" component={Mobx} />
            <Route path="/context" component={Context} />
            <Route path="/webworker" component={Webworker} />
            <Route path="/childrouter" component={ChildRouter} />
          </div>
      </div>
    )
  }
}

export default Wrap
