import React, { Component } from 'react'
import axios from 'axios'

export default class ItemApiSearch extends Component {
  state = {
    searchedItem: {
      query: ''
    }
  }

  handleChange = (event) => {
    const searchedItem = { ...this.state.searchedItem }
    searchedItem[event.target.name] = event.target.value
    this.setState({ searchedItem })
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    this.searchFood(this.state.searchedItem)
  }

  searchFood = async (foodAPI) => {
    const response = await axios.post(`/api/items/search`, foodAPI)
    const searchedItem = {...this.state.searchedItem}
    searchedItem.food_name = response.data.foods[0].food_name
    searchedItem.nf_calories = response.data.foods[0].nf_calories
    this.setState({ searchedItem })
    this.postItemToMeal(this.state.searchedItem)
  }
  postItemToMeal = async (oneItem) => {
    // const searchedItem = {...this.state.searchedItem}
    console.log(oneItem)
    const userId = this.props.userId
    const mealId = this.props.mealId
    await axios.post(`/api/users/${userId}/meals/${mealId}/items`, oneItem)
    await this.props.fetchItems()
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type='query' name='query'
            value={this.state.searchedItem.name}
            onChange={this.handleChange}
          />
          <input type='submit' value='Add Meal' />
        </form>
      </div>
    )
  }
}
