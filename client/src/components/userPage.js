import React, { Component } from 'react'
import axios from 'axios'
import MealComponent from './MealComponent';
import EditUserForm from './EditUserForm';
import { Button, Input, Image, Header } from 'semantic-ui-react';
import styled from 'styled-components'
import swal from 'sweetalert'


const StyledDateInput = styled(Input)`
  display:inline;
`
const StyledUserPage = styled.div`
  display: flex;
  flex-direction:column;
  align-items:center;
  /* height:100%; */
  padding-top: 70px;
`
const StyledButton = styled(Button)`
  &&&{
    background: #5B738E;
    color: #DDE5F9;
  }
`
export default class UserPage extends Component {
  state = {
    meals: [],
    user: {},
    dates: [],
    selectedDate: ""
  }

  componentDidMount = async () => {
    await this.getTodaysDate()
    await this.fetchData()
  }

  fetchData = async () => {
    const userId = this.props.match.params.user_id
    const response = await axios.get(`/api/users/${userId}/meals`)
    const responseUser = await axios.get(`/api/users/${userId}`)
    this.setState({ meals: response.data, user: responseUser.data })
  }

  getTodaysDate = async () => {
    const month = await new Date().getMonth()
    var day = await new Date().getDate()
    if (day < 10) {
      var day = `0` + `${day}`
    }
    const year = await new Date().getFullYear()
    this.setState({ selectedDate: `${year}-${month + 1}-${day}` })
  }

  handleChange = (event) => {
    this.setState({ selectedDate: event.target.value })
  }

  handleDelete = async () => {
    swal({
        title: `Are You Sure You want to Delete ${this.state.user.name} ?`,
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                swal('Success!', { icon: "success" })
                    .then(async () => {
                        await axios.delete(`/api/users/${this.state.user.id}`)
                        this.props.history.push(`/`)
                      })
            } else {
                swal("Successfully Cancelled");
            }
        })
    }

  
  render() {

    // const calories = () => {
    //   var sum = 0
    //   for (let i = 0; i < this.state.meals.length; i++) {
    //     var totalCalories = this.state.meals[i].nf_calories * this.state.items[i].servings
    //     sum += totalCalories
    //   }
    //   console.log(sum)
    //   return sum
    // }

    return (
      <StyledUserPage>
        <div>
          <Image size='tiny' circular src="https://static1.squarespace.com/static/55cd025ee4b06c2348a067bc/t/59b88151cd0f6831fdd28def/1530255791097/?format=1500w" alt="logo" />
        </div>
        <div>
          <Header size='huge'>{this.state.user.name}'s Page</Header>
        </div>
        <StyledDateInput type='date' name='date'
          value={this.state.selectedDate}
          onChange={this.handleChange}
        />

        {/* <div>Total Calories Today: {calories()}</div> */}
        <MealComponent
          userId={this.props.match.params.user_id}
          meals={this.state.meals}
          selectedDate={this.state.selectedDate}
          fetchData={this.fetchData}
        />
        <div>
          <StyledButton onClick={this.handleDelete}>delete user</StyledButton>
          <EditUserForm
            userId={this.props.match.params.user_id}
            fetchData={this.fetchData}
          />
        </div>

      </StyledUserPage>
    )
  }
}
