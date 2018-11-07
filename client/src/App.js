import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'
import landingPage from './components/landingPage';


class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route to="/users" component={landingPage}/>
        </Switch>
      </Router>
    );
  }
}

export default App;
