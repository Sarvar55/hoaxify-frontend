import {
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  UPDATE_SUCCESS,
} from "../config/Constants";

const defaultState = {
  isLoggedIn: false,
  userName: undefined,
  displayName: undefined,
  image: undefined,
  password: undefined,
};

const authreducer = (state, action) => {
  if (action.type == LOGOUT_SUCCESS) {
    return defaultState;
  } else if (action.type == LOGIN_SUCCESS) {
    return { ...action.payload, isLoggedIn: true };
  } else if (action.type == UPDATE_SUCCESS) {
    return { ...state, ...action.payload };
  }
  return state;
};

export default authreducer;
