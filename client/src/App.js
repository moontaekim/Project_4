import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'
import UserPage from './components/UserPage';
import LandingPage from './components/LandingPage';
import MealDetails from './components/MealDetails';


class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/users" component={LandingPage}/>
          <Route exact path="/users/:user_id" component={UserPage}/>
          <Route exact path="/users/:user_id/meals/:meal_id" component={MealDetails}/>
        </Switch>
      </Router>
    );
  }
}

export default App;
