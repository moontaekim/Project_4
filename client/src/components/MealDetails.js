import React, { Component } from 'react'
import axios from 'axios';
import ItemForm from './ItemForm';
import ItemApiSearch from './ItemApiSearch';

export default class MealDetails extends Component {
  state = {
    items: []
  }

  fetchItems = async () => {
    const userId = this.props.match.params.user_id
    const mealId = this.props.match.params.meal_id
    const response = await axios.get(`/api/users/${userId}/meals/${mealId}/items`)
    this.setState({ items: response.data })
  }


  componentDidMount = async () => {
    await this.fetchItems()
  }

  render() {

    const itemsList = this.state.items.map((item, i) => {
      return (
        <div key={i}>
          {item.name}
        </div>
      )
    })

    return (
      <div>
        <ItemApiSearch
          fetchItems={this.fetchItems}
        />
        <ItemForm
          items={this.state.items}
          fetchItems={this.fetchItems}
          mealId={this.props.match.params.meal_id}
          userId={this.props.match.params.user_id}
        />
        <div>{itemsList}</div>
      </div>
    )
  }
}
