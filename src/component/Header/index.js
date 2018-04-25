import React from 'react'
import {NavLink} from 'mirrorx'
import {Menu, Icon} from 'antd'
const MenuItem = Menu.Item

const Header = ({location}) => (
  <Menu
    mode="horizontal"
    theme="dark"
    selectedKeys={[location.pathname]}
  >
    <MenuItem key="/">
      <NavLink to="/"><Icon type="home" />Home</NavLink>
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
)

export default Header
