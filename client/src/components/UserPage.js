import React, { Component } from 'react'
import axios from 'axios'
import MealComponent from './MealComponent';


export default class UserPage extends Component {
  state = {
    meals: [],
    user: {},
    dates: [],
    selectedDate: "",
  }

  componentDidMount = async () => {
    await this.getTodaysDate()
    await this.fetchData()
  }
  
  fetchData = async () => {
    const userId = this.props.match.params.user_id
    const response = await axios.get(`/api/users/${userId}/meals`)
    const responseUser = await axios.get(`/api/users/${userId}`)
    this.setState({ meals: response.data, user: responseUser.data })
  }

  getTodaysDate = async () => {
    const month = await new Date().getMonth()
    var day = await new Date().getDate()
    if (day < 10) {
      var day = `0` + `${day}`
    }
    const year = await new Date().getFullYear()
    this.setState({ selectedDate: `${year}-${month + 1}-${day}` })
  }

  handleChange = (event) => {
    this.setState({ selectedDate: event.target.value })
  }

  deleteUser = async () => {
    await axios.delete(`/api/users/${this.state.user.id}`)
    this.props.history.push(`/`)
  }

  render() {

    // const calories = () => {
    //   var sum = 0
    //   for (let i = 0; i < this.state.meals.length; i++) {
    //     var totalCalories = this.state.meals[i].nf_calories * this.state.items[i].servings
    //     sum += totalCalories
    //   }
    //   console.log(sum)
    //   return sum
    // }

    return (
      <div>
        <h1>{this.state.user.name}</h1>
        <button onClick={this.deleteUser}>delete user</button>

        <input type='date' name='date'
        value={this.state.selectedDate}
        onChange={this.handleChange}
        />

        {/* <div>Total Calories Today: {calories()}</div> */}

        <MealComponent 
        userId = {this.props.match.params.user_id}
        meals = {this.state.meals}
        selectedDate = {this.state.selectedDate}
        fetchData = {this.fetchData}
        />

      </div>
    )
  }
}
