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
    this.setState({ searchedItem: response.data })
    this.props.fetchItems()
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
