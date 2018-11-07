import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import AddMealForm from './AddMealForm';



export default class MealPage extends Component {
  state = {
    dates: [],
    dateToday: "",
    meals:[],
    addMeal: false
    }

  getTodaysDate = async () => {
    const month = await new Date().getMonth()
    var day = await new Date().getDate()
    if(day < 10){
      var day = `0` + `${day}`
    }
    const year = await new Date().getFullYear()
    this.setState({dateToday: `${year}-${month+1}-${day}`})
  }

  componentDidMount = async () => {
    await this.getTodaysDate()
    await this.fetchUserMeals()
  }

  fetchUserMeals = async () => {
    const response = await axios.get(`/api/users/${this.props.userId}/meals`)
    this.setState({meals: response.data})
  }
  
  toggleAddMealForm = () => {
    this.setState({ addMeal: !this.state.addMeal })
  }
  
  render() {

    const todaysMeals = this.state.meals.map((meal) => {
      if(meal.date === this.state.dateToday){
        return(
          <div>
          <Link to={`/users/${this.props.userId}/meals/${meal.id}`}>{meal.description}</Link>
          </div>
        )
      }
    })

    return (
      <div>
        <div>{this.state.dateToday}</div>
        {/* <Link>(+) add meal</Link> */}
        <AddMealForm 
        fetchUserMeals = {this.fetchUserMeals}
        userId = {this.props.userId}
        />
        <div>{todaysMeals}</div>
      </div>
    )
  }
}
