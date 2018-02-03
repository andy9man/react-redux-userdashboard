import {
  UPDATE_VIEW,
  USER_SELECTED,
  INITIAL_VIEW,
  LOAD_DATA,
  LOAD_DATA_SUCCESS,
  DELETE_USER,
  DELETE_RESET
} from './actions'

const intialState = {
  users: [],
  userSelected: undefined,
  loadingData: false,
  loadingError: false,
  deleteUser: false,
  deletUserError: false,
  viewState: INITIAL_VIEW
}

class User {
  constructor( {id, createdAt, name, email} ) {
    this.id = id;
    this.createdAt = createdAt;
    this.name = name;
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
      return {...state, deleteUser: true};
    case DELETE_RESET:
      return {...state, deleteUser: false, deleteUserError: false}

    default:
      return state;
  }
}
