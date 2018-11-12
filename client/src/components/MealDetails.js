import React, { Component } from 'react'
import axios from 'axios';
import ItemForm from './ItemForm';
import ItemApiSearch from './ItemApiSearch';
import { Button } from 'semantic-ui-react';
import styled from 'styled-components'

const StyledButton = styled(Button)`
  &&&{
    background: #D3D4D8;
    color: #5B738E;
  }
`

export default class MealDetails extends Component {
  state = {
    items: []
  }

  componentDidMount = async () => {
    await this.fetchItems()
  }

  fetchItems = async () => {
    const userId = this.props.userId
    const mealId = this.props.mealId
    const response = await axios.get(`/api/users/${userId}/meals/${mealId}/items`)
    this.setState({ items: response.data })
  }

  deleteItem = async (itemId) => {
    const userId = this.props.userId
    const mealId = this.props.mealId
    await axios.delete(`/api/users/${userId}/meals/${mealId}/items/${itemId}`)
    this.fetchItems()
  }



  render() {

    const itemsList = this.state.items.map((item, i) => {
      return (
        <div key={i}>
          {item.food_name} | servings: {item.servings} | calories: {item.nf_calories * item.servings}
          <StyledButton circular icon="window minimize" onClick={() => this.deleteItem(item.id)} />
        </div>
      )
    })

    const calories = () => {
      var sum = 0
      for (let i = 0; i < this.state.items.length; i++) {
        var totalCalories = this.state.items[i].nf_calories * this.state.items[i].servings
        sum += totalCalories
      }
      return sum
    }

    return (
      <div>
        <ItemApiSearch
          fetchItems={this.fetchItems}
          mealId={this.props.mealId}
          userId={this.props.userId}
        />
        <ItemForm
          items={this.state.items}
          fetchItems={this.fetchItems}
          mealId={this.props.mealId}
          userId={this.props.userId}
        />
        <div>{itemsList}</div>
        <div>total calories: {calories()}</div>
      </div>
    )
  }
}
