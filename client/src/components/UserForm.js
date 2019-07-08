import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { addUser, updateUser } from '../actions';

const FormContainer = styled.div`
  width: 100%;

  form {
    width: 100%;
    display: flex;
    flex-direction: column;

    input {
      padding: 10px;
      border: 1px solid gray;
    }
  }
`;

class UserForm extends Component {
  state = {
    name: '',
    bio: '',
  };

  componentDidMount() {
    const { id, users } = this.props;
    if (id) {
      const currentUser = users.find(user => id === user.id);
      this.setState({ ...currentUser });
    }
  }

  inputHandler = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = e => {
    const user = { name: this.state.name, bio: this.state.bio };
    e.preventDefault();
    if (this.state.id) {
      this.updateUser(this.state.id, user);
    } else {
      this.addUser(user);
    }
  };

  addUser = user => {
    this.props.addUser(user).then(this.clearField);
  };

  updateUser = (id, user) => {
    this.props.updateUser(id, user).then(this.clearField);
  };

  clearField = res => {
    if (res) {
      this.setState({ name: '', bio: '' });
      this.props.closeForm();
    }
  };

  render() {
    const { id, name, bio } = this.state;
    return (
      <FormContainer>
        <form onSubmit={this.submitHandler}>
          <input
            value={name}
            onChange={this.inputHandler}
            placeholder="Name"
            type="text"
            name="name"
            required
          />
          <input
            value={bio}
            onChange={this.inputHandler}
            placeholder="Bio"
            type="text"
            name="bio"
            required
          />
          <button type="submit">{id ? 'Update' : 'Submit'}</button>
        </form>
        <button onClick={this.props.closeForm}>Cancel</button>
      </FormContainer>
    );
  }
}

export default connect(
  state => ({ users: state.users }),
  { addUser, updateUser },
)(UserForm);
