import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import UserPage from './components/UserPage';
import LandingPage from './components/LandingPage';
import styled from 'styled-components'

// const NavBar = styled.div`
//   background: red;
//   /* bottom: 0; */
// `
const StyledApp = styled.div`
    background: #D3D4D8;

  height: 100vh;
`

class App extends Component {
  render() {
    return (
      <Router>
        <StyledApp>
          <Switch>
            <Route exact path='/' component={LandingPage} />
            <Route path='/users/:user_id' component={UserPage} />
          </Switch>
          {/* <NavBar>a</NavBar> */}
        </StyledApp>
      </Router>
    );
  }
}

export default App;
