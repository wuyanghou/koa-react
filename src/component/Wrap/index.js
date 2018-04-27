import React from 'react';
import {Router, Route,NavLink} from 'mirrorx'
import {Menu, Icon,Button,message} from 'antd';
import asyncComponent from '../../asyncComponent'
import {httpGet} from 'SERVICE/index';
import styles from './index.less';
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
  logout=async ()=>{
    let {history}=this.props;
    await httpGet('/logout');
    message.success('退出成功',1);
    history.push('/login');

    var obj = {
      _count:3,
      get count() {
        return this._count<=2?3:this._count
      },
      set count(n){
        this._count=n;
      }
    }
  }
  render(){
    return (
      <div className={styles.header}>
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
        <Button onClick={this.logout} className={styles.logout}>安全退出</Button>
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
