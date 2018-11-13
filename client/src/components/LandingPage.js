import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import AddUserForm from './AddUserForm';
import styled from 'styled-components'
import { Button, Header } from 'semantic-ui-react'
import posed from 'react-pose';
import { tween } from "popmotion";

const Logo = posed.img({
  idle: {
    scale: 1,
    transition: props => tween({ ...props, duration: 2000 })
  },
  hovered: {
    scale: 1.3,
    opacity: 1,
    transition: props => tween({ ...props, duration: 2000 })
  }
});

const StyledLandingPage = styled.div`
  text-align: center;
  display: flex;
  flex-direction:column;
  justify-content: space-evenly;
  height: 100%;
`
const StyledButton = styled(Button)`
  &&&{
    background: #5B738E;
    color: #DDE5F9;
  }
`
const StyledUserList = styled(Link)`
  color: black;
  line-height: 30px;
`
const StyledHeader = styled(Header)`
  &&&{
    font-family: 'Raleway', sans-serif;
    font-size:50px;
  }
`

export default class LandingPage extends Component {
  state = {
    users: [],
    showAddUserForm: true,
    hovering: false
  }

  componentDidMount = async () => {
    await this.fetchUsers()
  }

  fetchUsers = async () => {
    const response = await axios.get('/api/users')
    this.setState({ users: response.data })
  }

  toggleUserForm = () => {
    this.setState({ showAddUserForm: !this.state.showAddUserForm })
  }

  render() {
    
    const users = this.state.users.map((user, i) => {
      return (
        <div key={i}>
          <StyledUserList to={`/users/${user.id}`}>{user.name}</StyledUserList>
        </div>
      )
    })


    return (
      <StyledLandingPage>

        <StyledHeader size="huge">Fit Camp</StyledHeader>
        <div>
          <Logo className="logo"
          pose={this.state.hovering ? "hovered" : "idle"}
          onMouseEnter={() => this.setState({ hovering: true })}
          onMouseLeave={() => this.setState({ hovering: false })}          
          src="https://static1.squarespace.com/static/55cd025ee4b06c2348a067bc/t/59b88151cd0f6831fdd28def/1530255791097/?format=1500w" alt="logo" />
        </div>
        <div>
          {this.state.showAddUserForm ?
            users : <AddUserForm
              fetchUsers={this.fetchUsers}
              history={this.props.history}
            />}
          <StyledButton circular onClick={this.toggleUserForm}>
            {this.state.showAddUserForm ? 'Create User' : 'Go Back'}
          </StyledButton>
        </div>
      </StyledLandingPage>
    )
  }
}
