import React, { Component } from 'react'
import axios from 'axios'
import AddMealForm from './AddMealForm';
import MealDetails from './MealDetails';
import styled from 'styled-components'
import { Accordion, Icon } from 'semantic-ui-react'


export default class MealPage extends Component {
  state = {
    dates: [],
    selectedDate: "",
    meals: [],
    addMeal: false,
    activeIndex: 0
  }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
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

  componentDidMount = async () => {
    await this.getTodaysDate()
    await this.fetchUserMeals()
  }

  fetchUserMeals = async () => {
    const response = await axios.get(`/api/users/${this.props.userId}/meals`)
    this.setState({ meals: response.data })
  }

  toggleAddMealForm = () => {
    this.setState({ addMeal: !this.state.addMeal })
  }

  handleChange = (event) => {
    this.setState({ selectedDate: event.target.value })
  }

  render() {
    const { activeIndex } = this.state

    const todaysMeals = this.state.meals.map((meal, i) => {
      if (meal.date === this.state.selectedDate) {
        return (
          <Accordion key={i}>
            <Accordion.Title active={activeIndex === i} index={i} onClick={this.handleClick}>
              <Icon name='dropdown' />
                {meal.description}
            </Accordion.Title>
            <Accordion.Content active={activeIndex === i}>
              <MealDetails 
              userId = {this.props.userId}
              mealId = {meal.id}
              />
            </Accordion.Content>
          </Accordion>
        )
      }
    })

    return (
      <div>
        <input type='date' name='date'
        value={this.state.selectedDate}
        onChange={this.handleChange}
        />
        <AddMealForm
          fetchUserMeals={this.fetchUserMeals}
          userId={this.props.userId}
        />

        <div>{todaysMeals}</div>
      </div>
    )
  }
}
