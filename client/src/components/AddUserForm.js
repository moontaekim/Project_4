import React, { Component } from 'react'
import axios from 'axios'
import { Form, Button } from 'semantic-ui-react';
import styled from 'styled-components'

const StyledForm = styled(Form)`
&&&{
  width: 50vw;
  margin: auto;
}
`

const StyledButton = styled(Button)`
  &&&{
    background: #5B738E;
    color: #DDE5F9;
  }
`
export default class AddUserForm extends Component {
  state = {
    newUser: {
      name: '',
      cal_goal: ''
    }
  }

  handleChange = (event) => {
    const newUser = { ...this.state.newUser }
    newUser[event.target.name] = event.target.value
    this.setState({ newUser })
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    const response = await axios.post('/api/users', this.state.newUser)
    const userId = response.data.id
    await this.props.history.push(`/users/${userId}`)
  }
  
  render() {
    return (
      <div>
        <StyledForm onSubmit={this.handleSubmit}>
          <Form.Group widths='equal'>
          <Form.Input fluid type='text' name='name'
            value={this.state.newUser.name}
            onChange={this.handleChange}
            placeholder="User Name"
          />
          <Form.Input fluid type='integer' name='cal_goal'
            value={this.state.newUser.cal_goal}
            onChange={this.handleChange}
            placeholder="Calories Goal"
          />
          <StyledButton type='submit' value='Add User'> + </StyledButton>
          </Form.Group>
        </StyledForm>      
      </div>
    )
  }
}
