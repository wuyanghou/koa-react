import React from 'react'
import {Router, Route} from 'mirrorx'
import asyncComponent from '../asyncComponent'

const Header=asyncComponent(()=>import('../component/Header'));

const Home=asyncComponent(()=>import('../view/Home'));
const DefaultProps=asyncComponent(()=>import('../view/DefaultProps'));
const Mobx=asyncComponent(()=>import('../view/Mobx'));
const Context=asyncComponent(()=>import('../view/Context'));
const Webworker=asyncComponent(()=>import('../view/Webworker'));
const ChildRouter=asyncComponent(()=>import('../view/ChildRouter'));
const App = () => (
  <Router>
    <div>
      <Route path="*" component={Header} />
      <Route exact path="/" component={Home} />
      <Route path="/defaultProps" component={DefaultProps} />
      <Route path="/mobx" component={Mobx} />
      <Route path="/context" component={Context} />
      <Route path="/webworker" component={Webworker} />
      <Route path="/childrouter" component={ChildRouter} />
    </div>
  </Router>
)

export default App
