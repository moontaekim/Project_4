import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'
import UserPage from './components/UserPage';



class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/' component={UserPage}/>
        </Switch>
      </Router>
    );
  }
}

export default App;
