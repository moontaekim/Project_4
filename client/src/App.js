import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'
import landingPage from './components/landingPage';
import userPage from './components/userPage';


class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/users" component={landingPage}/>
          <Route exact path="/users/:user_id" component={userPage}/>
        </Switch>
      </Router>
    );
  }
}

export default App;
