import { START, SUCCESS, FAILED, GET_USERS_SUCCESS } from '../actions';

const initialState = {
  isLoading: false,
  users: [],
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case START:
      return { ...state, error: false, isLoading: true };
    case GET_USERS_SUCCESS:
      return { ...state, isLoading: false, users: action.payload };
    case SUCCESS:
      return { ...state, isLoading: false };
    case FAILED:
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};
