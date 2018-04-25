import React from 'react'
import {Router, Route,Switch} from 'mirrorx'
import asyncComponent from '../asyncComponent'

const Wrap=asyncComponent(()=>import('../component/Wrap'));


const Login=asyncComponent(()=>import('../view/Login'));
const App = () => (
  <Router>
    <div>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/"  component={Wrap} />
      </Switch>

    </div>
  </Router>
)

export default App
