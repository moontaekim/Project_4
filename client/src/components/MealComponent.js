import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import AddMealForm from './AddMealForm';
import MealDetails from './MealDetails';


export default class MealPage extends Component {
  state = {
    dates: [],
    selectedDate: "",
    meals: [],
    addMeal: false
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

  componentDidMount = async () => {
    await this.getTodaysDate()
    await this.fetchUserMeals()
  }

  fetchUserMeals = async () => {
    const response = await axios.get(`/api/users/${this.props.userId}/meals`)
    this.setState({ meals: response.data })
  }

  toggleAddMealForm = () => {
    this.setState({ addMeal: !this.state.addMeal })
  }

  handleChange = (event) => {
    this.setState({ selectedDate: event.target.value })
  }

  render() {

    const todaysMeals = this.state.meals.map((meal, i) => {
      if (meal.date === this.state.selectedDate) {
        return (
          <div key={i}>
            {/* <Link to={`/users/${this.props.userId}/meals/${meal.id}`}>{meal.description}</Link> */}
            {meal.description}
            <MealDetails 
            userId = {this.props.userId}
            mealId = {meal.id}
            />
          </div>
        )
      }
    })

    return (
      <div>
        <input type='date' name='date'
        value={this.state.selectedDate}
        onChange={this.handleChange}
        />
        <AddMealForm
          fetchUserMeals={this.fetchUserMeals}
          userId={this.props.userId}
        />

        <div>{todaysMeals}</div>
      </div>
    )
  }
}
