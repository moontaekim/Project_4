import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import AddUserForm from './AddUserForm';


export default class LandingPage extends Component {
  state = {
    users: []
  }

  componentDidMount = async () => {
    await this.fetchUsers()
  }

  fetchUsers = async () => {
    const response = await axios.get('/api/users')
    this.setState({users: response.data})
  }  
  
  render() {
    const users = this.state.users.map((user, i) => {
      return(
        <div key={i}>
        <Link to={`/users/${user.id}`}>{user.name}</Link>
        </div>
      )
    })
    
    return (
      <div>
        {users}
        <AddUserForm
        fetchUsers = {this.fetchUsers}
        />
      </div>
    )
  }
}
