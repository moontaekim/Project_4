import React, { Component } from 'react'
import axios from 'axios'


export default class AddMealForm extends Component {
  state = {
    newMeal: {
      description: '',
      date: '',
      time: ''
    }
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    this.addMeal(this.state.newMeal)
  }

  handleChange = (event) => {
    const newMeal = {...this.state.newMeal}
    newMeal[event.target.name]= event.target.value
    this.setState({ newMeal })
  }

  addMeal = async (newMeal) => {
    const response = await axios.post(`/api/users/${this.props.userId}/meals`, newMeal)
    this.setState({ newMeal:response.data })
    this.props.fetchUserMeals()
  }

  render() {

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
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
