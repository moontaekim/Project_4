import React, { Component } from 'react'
import axios from 'axios'

export default class AddUserForm extends Component {
  state = {
    newUser: {
      name: '',
      cal_goal: ''
    }
  }


  handleChange = (event) => {
    const newUser = { ...this.state.newUser }
    newUser[event.target.name] = event.target.value
    this.setState({ newUser })
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    await axios.post('/api/users', this.state.newUser)
  }
  
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type='text' name='name'
            value={this.state.newUser.name}
            onChange={this.handleChange}
            placeholder="User Name"
          />
          <input type='integer' name='cal_goal'
            value={this.state.newUser.cal_goal}
            onChange={this.handleChange}
            placeholder="calories goal"
          />
          <input type='submit' value='Add User' />
        </form>      
      </div>
    )
  }
}
