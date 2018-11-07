import React, { Component } from 'react'
import axios from 'axios'


export default class AddMealForm extends Component {
  state = {
    newMeal: {}
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    this.addMeal(this.state.newMeal)
  }

  handleChange = (event) => {
    const newMeal = {...this.state.newUser}
    newMeal[event.target.name]= event.target.value
    this.setState({ newMeal })
  }

  addMeal = async (newUser) => {
    const response = await axios.post('/api/users', newUser)
    const users = [...this.state.users]
    users.push(response.data)
    this.setState({ users })
  }

  render() {

    return (
      <div>
        <form onSubmit={this.props.handleSubmit}>
          <input type='text' name='description'
            value={this.state.newMeal.description}
            onChange={this.handleChange}
          />
          <input type='date' name='date'
            value={this.state.newMeal.date}
            onChange={this.handleChange}
          />
          <input type='text' name='time'
            value={this.state.newMeal.time}
            onChange={this.handleChange}
          />
          <input type='submit' value='Add Food' />
        </form>
      </div>
    )
  }
}
