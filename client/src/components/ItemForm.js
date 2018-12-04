import React, { Component } from 'react'
import axios from 'axios';
import { Input, Form, Modal, Button } from 'semantic-ui-react';
import styled from 'styled-components'

const StyledButton = styled(Button)`
  &&&{
    background: #D3D4D8;
    color: #5B738E;
  }
`
export default class ItemForm extends Component {
  state = {
    newItem: {
      name: '',
      calorie: '',
      serving: ''
    },
    modalOpen:false
  }

  handleChange = (event) => {
    const newItem = { ...this.state.newItem }
    newItem[event.target.name] = event.target.value
    this.setState({ newItem })
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    this.addItem(this.state.newItem)
    this.toggleEditForm()
  }

  addItem = async (newItem) => {
    const userId = this.props.userId
    const mealId = this.props.mealId
    const response = await axios.post(`/api/users/${userId}/meals/${mealId}/items`, newItem)
    this.setState({ newItem: response.data })
    this.props.fetchItems()
    this.props.fetchData()
  }
  toggleEditForm = async () => {
    this.setState({ modalOpen: !this.state.modalOpen })
  }
  closeModal = () => {
    this.setState({ modalOpen: false })
  }

  addNewFoodModal = () => (
    <Modal trigger={<StyledButton circular icon='add' onClick={this.toggleEditForm}/>}
      open={this.state.modalOpen} onClose={this.closeModal} closeIcon
    >
      <Modal.Content form>
        <Form onSubmit={this.handleSubmit}>
        <Input type='text' name='food_name'
            value={this.props.items.name}
            onChange={this.handleChange}
            placeholder="food item"
          />
          <Input type='integer' name='nf_calories'
            value={this.props.items.calorie}
            onChange={this.handleChange}
            placeholder="calories"
          />
          <Input type='integer' name='servings'
            value={this.props.items.serving}
            onChange={this.handleChange}
            placeholder="servings"
          />
          <StyledButton type='submit'>+</StyledButton>
        </Form>
      </Modal.Content>
    </Modal>
  )

  render() {
    return (
      <div>
        Add Your Own Data:
        {this.addNewFoodModal()}
      </div>
    )
  }
}
