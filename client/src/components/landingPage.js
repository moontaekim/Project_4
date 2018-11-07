import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'


export default class landingPage extends Component {
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
    const users = this.state.users.map((user) => {
      return(
        <Link to={`/users/${user.id}`}>User Pagess</Link>
      )
    })
    return (
      <div>
        {users}
      </div>
    )
  }
}
