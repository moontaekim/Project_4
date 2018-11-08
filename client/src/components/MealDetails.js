import React, { Component } from 'react'
import axios from 'axios';
import ItemForm from './ItemForm';

export default class MealDetails extends Component {
  state = {
    items:[]
    }
  
  fetchItems = async () => {
    const userId = this.props.match.params.user_id
    const mealId = this.props.match.params.meal_id
    const response = await axios.get(`/api/users/${userId}/meals/${mealId}/items`)
    this.setState({items: response.data}) 
  }


  componentDidMount = async () => {
    await this.fetchItems()
  }
  
  render() {

    const itemsList = this.state.items.map((item) => {
      return(
        <div>
          {item.name}
        </div>
      )
    })

    return (
      <div>
        <ItemForm 
        items={this.state.items}
        fetchItems={this.fetchItems}
        mealId = {this.props.match.params.meal_id}
        userId = {this.props.match.params.user_id}
        />
        <div>{itemsList}</div>
      </div>
    )
  }
}
