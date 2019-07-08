import React, { Component } from 'react';
import styled from 'styled-components';

import Users from './Users';
import UserForm from './UserForm';

const AppContainer = styled.div`
  width: 50%;

  @media (max-width: 500px) {
    width: 100%;
  }

  button {
    padding: 10px;
    margin: 10px;
    border-radius: 3px;
  }
`;

class App extends Component {
  state = {
    isOpen: false,
    userId: null,
  };

  openForm = id => {
    if (id) {
      this.setState({ userId: id });
    }
    this.setState({ isOpen: true });
  };

  closeForm = () => {
    this.setState({ isOpen: false });
  };

  render() {
    const { isOpen, userId } = this.state;
    return (
      <AppContainer>
        <h1>Users</h1>
        <Users openForm={this.openForm} userId={userId} isOpen={isOpen} />
        {!isOpen && <button onClick={this.openForm}>Add User</button>}
        {isOpen && <UserForm id={userId} closeForm={this.closeForm} />}
      </AppContainer>
    );
  }
}

export default App;
