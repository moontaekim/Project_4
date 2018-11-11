import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import AddUserForm from './AddUserForm';
import styled from 'styled-components'
import { Image, Button } from 'semantic-ui-react'


const StyledLandingPage = styled.div`
  text-align: center;
  display: flex;
  flex-direction:column;
  justify-content: space-evenly;
  height: 100vh;
`
const StyledImage = styled.div`
  margin:auto;
`


export default class LandingPage extends Component {
  state = {
    users: [],
    showAddUserForm: true
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
          <Link to={`/users/${user.id}`}>{user.name}</Link>
        </div>
      )
    })

    return (
      <StyledLandingPage>
        <StyledImage>
          <Image size='small' circular src="https://static1.squarespace.com/static/55cd025ee4b06c2348a067bc/t/59b88151cd0f6831fdd28def/1530255791097/?format=1500w" alt="logo" />
        </StyledImage>        
        <div>
          {this.state.showAddUserForm ?
            users : <AddUserForm fetchUsers={this.fetchUsers} />}
          <Button circular onClick={this.toggleUserForm}>
            {this.state.showAddUserForm ? 'Create User' : 'Go Back'}
          </Button>
        </div>
      </StyledLandingPage>
    )
  }
}
