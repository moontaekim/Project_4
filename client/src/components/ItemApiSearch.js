import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import axios from 'axios'
import { Input } from 'semantic-ui-react';

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
    console.log(response)
    if(response.data.message === "We couldn't match any of your foods"){
      alert("We couldn't match any of your foods")
      return <Redirect to={`/users/${this.props.userId}`}/>

    }
    const searchedItem = { ...this.state.searchedItem }
    searchedItem.food_name = response.data.foods[0].food_name
    searchedItem.nf_calories = response.data.foods[0].nf_calories
    searchedItem.servings = searchedItem.servings
    this.setState({ searchedItem })
    this.postItemToMeal(this.state.searchedItem)
  }

  postItemToMeal = async (oneItem) => {
    const userId = this.props.userId
    const mealId = this.props.mealId
    await axios.post(`/api/users/${userId}/meals/${mealId}/items`, oneItem)
    await this.props.fetchItems()
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <Input type='query' name='query'
            value={this.state.searchedItem.name}
            onChange={this.handleChange}
            placeholder="food item"
          />
        <Input type='number' name='servings'
            value={this.state.searchedItem.servings}
            onChange={this.handleChange}
            placeholder="servings"
          />
          <Input type='submit' value='Add Food' />
        </form>
      </div>
    )
  }
}
