import {Switch, Redirect, Route} from 'react-router-dom'

import Login from './component/Login'

import Home from './component/Home'

import ProtectedRoute from './component/ProtectedRoute'

import NotFound from './component/NotFound'

import './App.css'

// Replace your code here
const App = () => (
  <Switch>
    <ProtectedRoute exact path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
    <Route exact path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)
export default App
