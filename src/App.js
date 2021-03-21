import React from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Switch, 
  Route,
} from 'react-router-dom';
import Home from './modules/home/Home';
import Member from './modules/Manage/Member/Member';
import Dashboard from './modules/Manage/dashboard/Dashboard';
import Event from './modules/Manage/event/Event';

let isLoginStatus = localStorage.getItem('login');
const UNDEFINED = undefined;
let InitElement = <Home/>

if(isLoginStatus === UNDEFINED) {
    localStorage.setItem('login', false);
} else {
  if(isLoginStatus) {
    InitElement = <Dashboard/>
  }
}

class MyApp extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/event'>
            <Event/>
          </Route>
          <Route path='/member'>
            <Member/>
          </Route>
          <Route path='/'>
            {InitElement}
          </Route>
        </Switch>
      </Router>
    );
  };
};
export default MyApp;
