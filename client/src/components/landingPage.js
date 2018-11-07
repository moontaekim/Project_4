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
    return (
      <div>
        LANDING PAGE!!!!
      </div>
    )
  }
}
