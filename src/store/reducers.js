import { INITIAL_VIEW, LOAD_DATA, LOAD_DATA_SUCCESS } from './actions'

const intialState = {
  users: [],
  userSelected: undefined,
  loadingData: false,
  loadingError: false,
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
    case INITIAL_VIEW:
      return { ...state, viewState: INITIAL_VIEW };
    case LOAD_DATA:
      return {...state, loadingData: action.payload};
    case LOAD_DATA_SUCCESS:
      const users = action.payload.map( user => new User(user) );
      return {...state, users: users, loadingData: false};
    default:
      return state;
  }
}
