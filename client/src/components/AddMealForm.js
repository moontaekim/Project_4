import React, { Component } from 'react'
import axios from 'axios'
import { Form, Button, Dropdown } from 'semantic-ui-react'
import styled from 'styled-components'

const StyledForm = styled(Form)`
  &&&{
    width:30vw;
    position: relative;
  }
`
const StyledFormGroup = styled(Form.Group)`
  &&&{
    display:flex;
    flex-direction: column;
  }
`
const StyledButton = styled(Button)`
  &&&{
    background: #5B738E;
    color: #DDE5F9;
  }
`

export default class AddMealForm extends Component {
  state = {
    newMeal: {
      description: '',
      date: '',
      time: ''
    }
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    this.addMeal(this.state.newMeal)
  }

  handleChange = (event) => {
    const newMeal = { ...this.state.newMeal }
    newMeal[event.target.name] = event.target.value
    this.setState({ newMeal })
  }

  addMeal = async (newMeal) => {
    const response = await axios.post(`/api/users/${this.props.userId}/meals`, newMeal)
    this.setState({ newMeal: response.data })
    this.props.fetchData()
  }

  render() {

    return (
      <div>
        <StyledForm onSubmit={this.handleSubmit}>
          <StyledFormGroup widths='equal'>

            <Form.Input type='text' name='description'
              value={this.state.newMeal.description}
              onChange={this.handleChange}
              placeholder="Description"
            />

            <Form.Input type='date' name='date'
              value={this.state.newMeal.date}
              onChange={this.handleChange}
            />
            <StyledButton type='submit' value='Add Meal' > + </StyledButton>
          </StyledFormGroup>
        </StyledForm>
      </div>
    )
  }
}
