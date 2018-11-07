import React, { Component } from 'react'
import axios from 'axios';

export default class MealDetails extends Component {
  state = {
    items:[]
  }
  
  fetchItems = async () => {
    const userId = this.props.match.params.user_id
    const mealId = this.props.match.params.meal_id
    const response = await axios.get(`/api/users/${userId}/meals/${mealId}/items`)
    console.log(response)
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
        {itemsList}
      </div>
    )
  }
}
