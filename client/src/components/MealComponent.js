import React, { Component } from 'react'
import axios from 'axios'


export default class MealPage extends Component {
  state = {
    dates: [],
    dateToday: {},
    meals:[]
  }

  getTodaysDate = async () => {
    const today = await new Date()
    this.setState({dateToday: today})
    // today.getMonth()
  }

  componentDidMount = async () => {
    await this.getTodaysDate()
    await this.fetchUserMeals()
  }

  fetchUserMeals = async () => {
    const response = await axios.get(`/api/users/${this.props.userId}/meals`)
    this.setState({meals: response.data})
  }
  
  render() {
    return (
      <div>
        Component
      </div>
    )
  }
}
