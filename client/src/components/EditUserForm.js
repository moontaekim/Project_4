import React, { Component } from 'react'
import axios from 'axios'
import { Button, Modal, Form, Input } from 'semantic-ui-react'
import styled from 'styled-components'

const StyledEditUserForm = styled.div`
  display:inline;
`
const StyledButton = styled(Button)`
  &&&{
    background: #5B738E;
    color: #DDE5F9;
  }
`

export default class EditUserForm extends Component {
  state = {
    user: {
      name: '',
      cal_goal: ''
    },
    modalOpen: false
  }

  handleChange = (event) => {
    const user = { ...this.state.user }
    user[event.target.name] = event.target.value
    this.setState({ user })
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    await axios.put(`/api/users/${this.props.userId}`, this.state.user)
    await this.props.fetchData()
    await this.toggleEditForm()
  }

  toggleEditForm = async () => {
     this.setState({ modalOpen: !this.state.modalOpen })
  }

  closeModal = () => {
    this.setState({modalOpen:false})
  }

  editUserModal = () => (
    <Modal trigger={<StyledButton onClick={this.toggleEditForm}>Edit User</StyledButton>}
      open={this.state.modalOpen} onClose={this.closeModal} closeIcon
    >
      <Modal.Content form>
      <Form onSubmit={this.handleSubmit}>
          <Input type='text' name='name'
            value={this.state.user.name}
            onChange={this.handleChange}
            placeholder="User Name"
          />
          <Input type='integer' name='cal_goal'
            value={this.state.user.cal_goal}
            onChange={this.handleChange}
            placeholder="Calories Goal"
          />
          <Input type='submit' value='Update User'  />
        </Form>
      </Modal.Content>
    </Modal>
  )

  render() {
    return (
      <StyledEditUserForm>
        {this.editUserModal()}
      </StyledEditUserForm>
    )
  }
}
