import { userConstants } from '../_constants';

let userJSON = localStorage.getItem('user');
let user = userJSON !== null ? JSON.parse(userJSON) : '';
const initialState = user ? { loggedIn: true, user } : {};

export function authentication(state = initialState, action: any) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user
      };
    case userConstants.LOGIN_FAILURE:
      return {};
    case userConstants.LOGOUT:
      return {};
    default:
      return state
  }
}