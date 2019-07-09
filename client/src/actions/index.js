import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users';

export const START = 'START';
export const FAILED = 'FAILED';
export const SUCCESS = 'SUCCESS';
export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';

export const getUsers = () => async dispatch => {
  dispatch({ type: START });
  try {
    const res = await axios.get(API_URL);
    if (res) {
      let { data } = res;
      dispatch({ type: GET_USERS_SUCCESS, payload: data });
    }
  } catch {
    dispatch({ type: FAILED, payload: 'Error Fetching Users' });
  }
};

export const addUser = newUser => async dispatch => {
  dispatch({ type: START });
  try {
    const res = await axios.post(API_URL, newUser);
    if (res) {
      dispatch(getUsers());
      dispatch({ type: SUCCESS });
      return res;
    }
  } catch {
    dispatch({ type: FAILED, payload: 'Error Adding User' });
  }
};

export const deleteUser = id => async dispatch => {
  dispatch({ type: START });
  try {
    const res = await axios.delete(`${API_URL}/${id}`);
    if (res) {
      dispatch(getUsers());
      dispatch({ type: SUCCESS });
    }
  } catch {
    dispatch({ type: FAILED, payload: 'Error Deleting User' });
  }
};

export const updateUser = (id, newInfo) => async dispatch => {
  dispatch({ type: START });
  try {
    const res = await axios.put(`${API_URL}/${id}`, newInfo);
    if (res) {
      dispatch(getUsers());
      dispatch({ type: SUCCESS });
      return res;
    }
  } catch {
    dispatch({ type: FAILED, payload: 'Error Updating User' });
  }
};
