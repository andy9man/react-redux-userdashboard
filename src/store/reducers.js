import {
  INITIAL_VIEW,
  UPDATE_VIEW,
  USER_SELECTED,

  LOAD_DATA,

  DATA_STATUS_HANDLER,
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
  addUserSuccess: false,
  addUserError: false,
  displayAlert: false,
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
    case DATA_STATUS_HANDLER:
      return { ...state, [action.payload.type]: action.payload.result, displayAlert: action.payload.result};
    case LOAD_DATA:
      const users = action.payload.result.map( user => new User(user) );
      return {...state, [action.payload.type]: users, loadingData: false};
    case STATE_RESET:
      return {
        ...state,
        deleteUserSuccess: false,
        deleteUserError: false,
        editUserSuccess: false,
        editUserError: false,
        addUserSuccess: false,
        addUserError: false,
        displayAlert: false,
        userSelected: undefined
      }

    default:
      return state;
  }
}
