import React, { Component } from 'react'
import axios from 'axios'

export default class CalorieChart extends Component {
  state={
    caloriesByDate: [],
    meals: [],
    allItems: []
  }

  componentDidMount = async() => {
    await this.fetchMeals()
    await this.fetchItems()
  }

  fetchMeals = async() => {
    const userId = this.props.userId
    const response = await axios.get(`/api/users/${userId}/meals`)
    this.setState({ meals: response.data })
  }

  fetchItems = async () => {
    const allItems = []
    await this.state.meals.map((meal) => {
      const userId = this.props.userId
      axios.get(`/api/users/${userId}/meals/${meal.id}/items`)
        .then((response) => {
          allItems.push(response.data)
          this.setState({allItems})
        })

    })
  }


  render() {

    return (
      <div>
        CALORIE CHART
      </div>
    )
  }
}
