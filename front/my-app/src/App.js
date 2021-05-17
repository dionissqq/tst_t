import axios from 'axios';
import './App.css'
import Navbar from './components/navbar'
import Posts from './components/posts'
import Login from './components/login'
import Register from './components/register'
import Activity from './components/activity'
import Analitics from './components/analytics'
import Logout from './components/logout'
import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App(props){
    const [is_logged_in, setLogin] = useState(localStorage.getItem('access')!=undefined)
    return (
      <React.Fragment>
        <Router>
        <Navbar is_logged_in ={is_logged_in}/>
          <div className="main_block">
          <Switch>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <Login login={setLogin}/>
          </Route>
          <Route path="/logout">
            <Logout login={setLogin}/>
          </Route>
          <Route path="/activity">
            <Activity/>
          </Route>
          <Route path="/analytics">
            <Analitics/>
          </Route>
          <Route path="/">
            <Posts />
          </Route>
        </Switch>
          </div>
      </Router>
      </React.Fragment>
    );
}

export default App;