import React, { Component } from 'react'
import axios from 'axios';
import { Input } from 'semantic-ui-react';


export default class ItemForm extends Component {
  state = {
    newItem: {
      name: '',
      calorie: '',
      serving: ''
    }
  }

  handleChange = (event) => {
    const newItem = { ...this.state.newItem }
    newItem[event.target.name] = event.target.value
    this.setState({ newItem })
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    this.addItem(this.state.newItem)
  }

  addItem = async (newItem) => {
    const userId = this.props.userId
    const mealId = this.props.mealId
    const response = await axios.post(`/api/users/${userId}/meals/${mealId}/items`, newItem)
    this.setState({ newItem: response.data })
    this.props.fetchItems()
  }

  render() {
    return (
      <div>
        Add Your Own Data:
        <form onSubmit={this.handleSubmit}>

          <Input type='text' name='food_name'
            value={this.props.items.name}
            onChange={this.handleChange}
            placeholder="food item"
          />
          <Input type='integer' name='nf_calories'
            value={this.props.items.calorie}
            onChange={this.handleChange}
            placeholder="calories"
          />
          <Input type='integer' name='servings'
            value={this.props.items.serving}
            onChange={this.handleChange}
            placeholder="servings"
          />
          <Input type='submit' value='Add Food' />
        </form>
      </div>
    )
  }
}
