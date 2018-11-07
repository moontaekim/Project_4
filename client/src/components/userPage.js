import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
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
        {/* maybe make a turnary to swap this entire page out with date selected? */}

        <MealComponent userId = {this.props.match.params.user_id}/>

        <div>Have a date selector here that will use a turnary to display only the day selected meals</div>
      </div>
    )
  }
}
