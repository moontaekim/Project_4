import React, { Component } from 'react'
import AddMealForm from './AddMealForm';
import MealDetails from './MealDetails';
import { Accordion, Icon, Button } from 'semantic-ui-react'
import axios from 'axios'
import styled from 'styled-components'

const StyledButton = styled(Button)`
  &&&{
    background: #5B738E;
    color: #DDE5F9;
    margin-top: 20px;
  }
`
const StyledMealButton = styled(Button)`
  &&&{
    background: #D3D4D8;
    color: #5B738E;
  }
`

export default class MealPage extends Component {
  state = {
    addMeal: true,
    activeIndex: 0
  }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }

  toggleAddMealForm = () => {
    this.setState({ addMeal: !this.state.addMeal })
  }

  deleteMeal = async (mealId) => {
    await axios.delete(`/api/users/${this.props.userId}/meals/${mealId}`)
    await this.props.fetchData()
  }
  render() {
    const { activeIndex } = this.state

    const todaysMeals = this.props.meals.map((meal, i) => {
      if (meal.date === this.props.selectedDate) {
        return (
          <Accordion key={i}>
            <Accordion.Title active={activeIndex === i} index={i} onClick={this.handleClick}>
              <Icon name='dropdown' />
              {meal.description}
              <StyledMealButton circular icon='delete' onClick={() => { this.deleteMeal(meal.id) }} />
            </Accordion.Title>
            <Accordion.Content active={activeIndex === i}>
              <MealDetails
                userId={this.props.userId}
                mealId={meal.id}
              />
            </Accordion.Content>
          </Accordion>
        )
      }
    })

    return (
      <div>
        <div>
        {this.state.addMeal ? null : <AddMealForm
          fetchData={this.props.fetchData}
          userId={this.props.userId}
        />}
        </div>

        {this.state.addMeal ? 
        <StyledButton onClick={this.toggleAddMealForm}>Add Meal</StyledButton>
        : null}

        <div>{todaysMeals}</div>
      </div>
    )
  }
}
