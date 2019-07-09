import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { getUsers, deleteUser } from '../actions';

const UsersContainer = styled.div``;

const User = styled.div`
  border: 1px solid gray;
  margin: 5px;
  padding: 10px;
  border-radius: 3px;
`;

class Users extends Component {
  componentDidMount() {
    this.props.getUsers();
  }

  render() {
    const { isOpen, deleteUser, users, openForm } = this.props;

    return (
      <UsersContainer>
        {users.length > 0 ? (
          users.map(user => (
            <User key={user.id}>
              <p>Name: {user.name}</p>
              <p>Bio: {user.bio}</p>
              {!isOpen && (
                <React.Fragment>
                  <button onClick={() => deleteUser(user.id)}>Remove</button>
                  <button onClick={() => openForm(user.id)}>Edit</button>
                </React.Fragment>
              )}
            </User>
          ))
        ) : (
          <p>There are no Users</p>
        )}
      </UsersContainer>
    );
  }
}

export default connect(
  state => ({ users: state.users }),
  { getUsers, deleteUser },
)(Users);
