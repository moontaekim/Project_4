import React, { Component } from 'react'
import axios from 'axios'

export default class EditUserForm extends Component {
  state = {
    user: {
      name:'',
      cal_goal:''
    }
  }


  handleChange = (event) => {
    const user = { ...this.state.user }
    user[event.target.name] = event.target.value
    this.setState({ user })
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    await axios.put(`/api/users/${this.props.userId}`, this.state.user)
    await this.props.fetchData()
  }


  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type='text' name='name'
            value={this.state.user.name}
            onChange={this.handleChange}
            placeholder="User Name"
          />
          <input type='integer' name='cal_goal'
            value={this.state.user.cal_goal}
            onChange={this.handleChange}
            placeholder="calories goal"
          />
          <input type='submit' value='Add User' />
        </form>      
      </div>
    )
  }
}
