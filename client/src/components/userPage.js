import React, { Component } from 'react'
import axios from 'axios'
import MealComponent from './MealComponent';


export default class userPage extends Component {
  state = {
    user: {},
  }

  componentDidMount = async () => {
    await this.fetchUser()
  }

  fetchUser = async () => {
    const userId = this.props.match.params.user_id
    const response = await axios.get(`/api/users/${userId}`)
    this.setState({user: response.data})
  }


  render() {

    return (
      <div>
        <img src="https://www.mathgoodies.com/sites/all/modules/custom/lessons/images/graphs/line_definitions.jpg"/>
        <br/>

        <MealComponent userId = {this.props.match.params.user_id}/>

      </div>
    )
  }
}
