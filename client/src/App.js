import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'
import UserPage from './components/UserPage';
import LandingPage from './components/LandingPage';



class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path = '/' component={LandingPage}/>
          <Route path='/users/:user_id' component={UserPage}/>
        </Switch>
      </Router>
    );
  }
}

export default App;
