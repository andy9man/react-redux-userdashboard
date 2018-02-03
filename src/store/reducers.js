import {
  UPDATE_VIEW,
  EDIT_VIEW,
  USER_SELECTED,
  INITIAL_VIEW,
  LOAD_DATA,
  LOAD_DATA_SUCCESS,
  DELETE_USER,
  STATE_RESET
} from './actions'

const intialState = {
  users: [],
  userSelected: undefined,
  loadingData: false,
  loadingError: false,
  deleteUserSuccess: false,
  deletUserError: false,
  editUserSuccess: false,
  editUserError: false,
  viewState: INITIAL_VIEW
}

class User {
  constructor( {id, createdAt, firstName, lastName, email} ) {
    this.id = id;
    this.createdAt = createdAt;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
  }
}

export const reducer = (state=intialState, action) => {
  switch(action.type) {
    case UPDATE_VIEW:
      return { ...state, viewState: action.payload };
    case USER_SELECTED:
      return { ...state, userSelected: action.payload };
    case LOAD_DATA:
      return {...state, loadingData: action.payload};
    case LOAD_DATA_SUCCESS:
      const users = action.payload.map( user => new User(user) );
      return {...state, users: users, loadingData: false};
    case DELETE_USER:
      return {...state, deleteUserSuccess: true};
    case STATE_RESET:
      return {
        ...state,
        deleteUserSuccess: false,
        deleteUserError: false,
        editUserSuccess: false,
        editUserError: false,
        userSelected: undefined
      }

    default:
      return state;
  }
}
